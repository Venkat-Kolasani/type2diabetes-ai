import os
import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend requests

# --- 1. Model Loading ---

MODEL_DIR = 'model'
MODEL_FILE = 'model.pkl'
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_FILE)

model = None

def load_model():
    """Load the pre-trained model from disk."""
    global model
    try:
        if not os.path.exists(MODEL_PATH):
            print(f"ERROR: Model file not found at '{MODEL_PATH}'.")
            print("Please make sure your trained model is placed in the 'backend/model/' directory and named 'model.pkl'.")
            model = None
            return
            
        # Load the model data
        model_data = joblib.load(MODEL_PATH)
        
        # Check if it's a dictionary with preprocessing pipeline
        if isinstance(model_data, dict):
            print(f"SUCCESS: Model dictionary loaded from '{MODEL_PATH}'.")
            print(f"Dictionary keys: {list(model_data.keys())}")
            
            # Extract components
            if 'model' in model_data:
                actual_model = model_data['model']
                scaler = model_data.get('scaler')
                poly = model_data.get('poly')
                selector = model_data.get('selector')
                
                print(f"✅ LightGBM Model: {type(actual_model).__name__}")
                print(f"✅ Scaler: {type(scaler).__name__ if scaler else 'None'}")
                print(f"✅ Polynomial Features: {type(poly).__name__ if poly else 'None'}")
                print(f"✅ Feature Selector: {type(selector).__name__ if selector else 'None'}")
                
                # Store the complete pipeline as a dictionary
                model = {
                    'classifier': actual_model,
                    'scaler': scaler,
                    'poly': poly,
                    'selector': selector,
                    'feature_names': model_data.get('feature_names'),
                    'threshold': model_data.get('threshold', 0.5)
                }
                
                print(f"🎯 Complete preprocessing pipeline loaded successfully!")
            else:
                print("ERROR: No 'model' key found in the dictionary")
                model = None
        # Handle case where model is directly a scikit-learn model
        elif hasattr(model_data, 'predict') and callable(model_data.predict):
            model = {'classifier': model_data, 'scaler': None, 'poly': None, 'selector': None}
            print(f"SUCCESS: Direct model loaded from '{MODEL_PATH}'.")
            print(f"Model type: {type(model_data).__name__}")
        else:
            print("ERROR: The model file does not contain a valid model or dictionary.")
            print(f"Loaded object type: {type(model_data).__name__}")
            model = None
            
    except Exception as e:
        import traceback
        print("\n=== ERROR LOADING MODEL ===")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
        print("\nFull traceback:")
        print(traceback.format_exc())
        model = None

# --- 2. Feature Validation and Preprocessing ---

def validate_and_prepare_data(json_data):
    """Validates incoming JSON and prepares it as a DataFrame for the model."""
    # Check if data is a dictionary
    if not isinstance(json_data, dict):
        return None, "Invalid input: data must be a JSON object."
    
    # Get model's expected features if available
    expected_features = []
    if hasattr(model, 'feature_name_'):  # LightGBM
        # Handle case where feature_name_ might be a list or numpy array
        feature_names = model.feature_name_
        expected_features = feature_names.tolist() if hasattr(feature_names, 'tolist') else feature_names
    elif hasattr(model, 'feature_names_in_'):  # scikit-learn
        feature_names = model.feature_names_in_
        expected_features = feature_names.tolist() if hasattr(feature_names, 'tolist') else feature_names
    
    # Use the exact 21 features the model was trained on
    expected_features = [
        'HighBP', 'HighChol', 'CholCheck', 'BMI', 'Smoker', 'Stroke', 
        'HeartDiseaseorAttack', 'PhysActivity', 'Fruits', 'Veggies', 
        'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost', 'GenHlth', 
        'MentHlth', 'PhysHlth', 'DiffWalk', 'Sex', 'Age', 'Education', 'Income'
    ]
    
    print(f"Using {len(expected_features)} expected features:")
    print(", ".join(expected_features))
    
    print(f"\n=== Model expects {len(expected_features)} features ===")
    print("First 10 features:", expected_features[:10])
    print("Input JSON keys:", list(json_data.keys()))
    
    # Prepare data with all expected features, fill missing with 0
    prepared_data = {}
    for feature in expected_features:
        if feature in json_data:
            prepared_data[feature] = json_data[feature]
        else:
            print(f"Warning: Using default value 0 for missing feature: {feature}")
            prepared_data[feature] = 0  # Default value for missing features
    
    # Create DataFrame with the correct column order
    try:
        df = pd.DataFrame([prepared_data])
        df = df[expected_features]  # Enforce the correct order
        return df, None
    except Exception as e:
        return None, f"Error creating DataFrame: {e}"

# --- 3. API Endpoints ---

@app.route('/predict', methods=['POST'])
def predict_endpoint():
    """API endpoint to get a diabetes prediction."""
    # Check if the model is loaded
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    # Get JSON data from request
    json_data = request.get_json()
    if not json_data:
        return jsonify({'error': 'Invalid request: No JSON data provided.'}), 400

    # Validate and prepare the data
    data_df, error_message = validate_and_prepare_data(json_data)
    if error_message:
        return jsonify({'error': error_message}), 400

    # Make prediction
    try:
        print("\n=== 🔍 DETAILED PREDICTION DEBUG ===")
        print(f"📊 Received JSON data: {json_data}")
        print(f"📏 Input data shape: {data_df.shape}")
        print(f"📋 Input data columns: {data_df.columns.tolist()}")
        print(f"� First row values: {data_df.iloc[0].to_dict()}")
        
        # Check if model is properly loaded with preprocessing pipeline
        if not isinstance(model, dict) or 'classifier' not in model:
            print("❌ Model not properly loaded or missing preprocessing components")
            return jsonify({'error': 'Model not properly configured'}), 500
        
        classifier = model['classifier']
        scaler = model['scaler']
        poly = model['poly']
        selector = model['selector']
        threshold = model.get('threshold', 0.5)
        
        print(f"🎯 Model components loaded:")
        print(f"  Classifier: {type(classifier).__name__}")
        print(f"  Scaler: {type(scaler).__name__ if scaler else 'None'}")
        print(f"  Polynomial: {type(poly).__name__ if poly else 'None'}")
        print(f"  Selector: {type(selector).__name__ if selector else 'None'}")
        print(f"  Threshold: {threshold}")
        
        # Apply preprocessing pipeline in correct order
        processed_data = data_df.copy()
        
        # Step 1: Apply polynomial features FIRST (21 → 231 features)
        if poly is not None:
            print("🔄 Applying PolynomialFeatures...")
            processed_array = poly.transform(processed_data)
            print(f"📏 After polynomial: shape {processed_array.shape}")
            
            # Get feature names if available
            try:
                poly_feature_names = poly.get_feature_names_out(processed_data.columns)
                processed_data = pd.DataFrame(processed_array, columns=poly_feature_names)
            except:
                processed_data = pd.DataFrame(processed_array)
        
        # Step 2: Apply feature selection SECOND (231 → 75 features)
        if selector is not None:
            print("🔄 Applying SelectKBest...")
            processed_array = selector.transform(processed_data)
            print(f"📏 After selection: shape {processed_array.shape}")
            
            # Create DataFrame with selected features
            try:
                selected_features = selector.get_feature_names_out()
                processed_data = pd.DataFrame(processed_array, columns=selected_features)
            except:
                processed_data = pd.DataFrame(processed_array)
        
        # Step 3: Apply scaling LAST (75 features)
        if scaler is not None:
            print("🔄 Applying StandardScaler...")
            processed_data = pd.DataFrame(
                scaler.transform(processed_data),
                columns=processed_data.columns
            )
            print(f"📊 After scaling: shape {processed_data.shape}")
        
        print(f"✅ Final processed data shape: {processed_data.shape}")
        
        # Make prediction with the classifier
        prediction_proba = classifier.predict_proba(processed_data)[0]
        prediction_class = classifier.predict(processed_data)[0]
        
        print(f"📊 Prediction probabilities: {prediction_proba}")
        print(f"🎯 Prediction class: {prediction_class}")
        print(f"🎯 Using threshold: {threshold}")
        
        # Apply custom threshold if specified
        if len(prediction_proba) >= 2:
            diabetes_probability = prediction_proba[1]  # Probability of diabetes
            final_prediction = 1 if diabetes_probability >= threshold else 0
            print(f"📈 Diabetes probability: {diabetes_probability:.4f}")
            print(f"🏁 Final prediction (with threshold): {final_prediction}")
        else:
            final_prediction = int(prediction_class)
            print(f"🏁 Final prediction (direct): {final_prediction}")
        
        return jsonify({'prediction': final_prediction})

    except Exception as e:
        import traceback
        error_details = {
            'error': str(e),
            'type': type(e).__name__,
            'traceback': traceback.format_exc()
        }
        print("\n=== PREDICTION ERROR DETAILS ===")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
        print("\nFull traceback:")
        print(traceback.format_exc())
        
        return jsonify({
            'error': 'Failed to make a prediction.',
            'details': str(e),
            'type': type(e).__name__
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify service status."""
    status = 'ok' if model is not None else 'error'
    return jsonify({'status': status, 'model_loaded': model is not None})

# --- 4. Application Startup ---

if __name__ == '__main__':
    print("--- Starting Diabetes Risk Prediction Backend ---")
    load_model()  # Pre-load the model on application startup
    # Running in debug mode is convenient for development.
    # For production, use a WSGI server like Gunicorn.
    app.run(debug=True, port=5001)
