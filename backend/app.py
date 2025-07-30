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
            
        # Load the model
        loaded = joblib.load(MODEL_PATH)
        
        # Check if the loaded object is a scikit-learn model or similar
        if hasattr(loaded, 'predict') and callable(loaded.predict):
            model = loaded
            print(f"SUCCESS: Model loaded successfully from '{MODEL_PATH}'.")
            print(f"Model type: {type(model).__name__}")
            
            # Print model information
            if hasattr(model, 'feature_name_'):  # LightGBM specific
                feature_names = model.feature_name_
                if hasattr(feature_names, 'tolist'):
                    feature_names = feature_names.tolist()
                print(f"\nModel expects {len(feature_names)} features:")
                print(", ".join(feature_names))
            elif hasattr(model, 'feature_importances_'):
                print(f"\nModel expects {len(model.feature_importances_)} features")
            
            # If it's a scikit-learn model, try to print its parameters
            if hasattr(model, 'get_params'):
                print("\nModel parameters:")
                for param, value in list(model.get_params().items())[:10]:  # Show first 10 params
                    print(f"  {param}: {value}")
                if len(model.get_params()) > 10:
                    print(f"  ... and {len(model.get_params()) - 10} more parameters")
        # Handle case where model is saved as a dictionary with 'model' key
        elif isinstance(loaded, dict) and 'model' in loaded and hasattr(loaded['model'], 'predict'):
            model = loaded['model']
            print(f"SUCCESS: Model loaded from dictionary at '{MODEL_PATH}'.")
            print(f"Model type: {type(model).__name__}")
        else:
            print("ERROR: The model file does not appear to be a valid scikit-learn model.")
            print(f"Loaded object type: {type(loaded).__name__}")
            print("If you saved a dictionary, make sure the model is stored under a 'model' key.")
            print("For example, use: joblib.dump({'model': your_model}, 'model.pkl')")
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
        print("\n=== Prediction Debug Info ===")
        print(f"Input data shape: {data_df.shape}")
        print(f"Input data columns: {data_df.columns.tolist()}")
        print(f"Input data dtypes: {data_df.dtypes.to_dict()}")
        print(f"First row values: {data_df.iloc[0].to_dict()}")
        
        # Get model's expected features
        expected_features = []
        if hasattr(model, 'feature_name_'):  # LightGBM
            expected_features = model.feature_name_
            if hasattr(expected_features, 'tolist'):
                expected_features = expected_features.tolist()
        elif hasattr(model, 'feature_names_in_'):  # scikit-learn
            expected_features = model.feature_names_in_.tolist()
        
        if expected_features:
            print(f"\nModel expects {len(expected_features)} features:")
            print(", ".join(expected_features))
            
            # If there's a mismatch, create a DataFrame with all expected features
            if set(data_df.columns) != set(expected_features):
                print("\nFeature mismatch detected. Adjusting input features...")
                # Create a new DataFrame with all expected features, filled with 0
                adjusted_df = pd.DataFrame(0, index=[0], columns=expected_features)
                # Fill in the values we have
                for col in data_df.columns:
                    if col in adjusted_df.columns:
                        adjusted_df[col] = data_df[col].values
                data_df = adjusted_df
                print(f"Adjusted input shape: {data_df.shape}")
        
        # Make prediction with disabled shape check for LightGBM
        if hasattr(model, 'predict') and 'lightgbm' in str(type(model)).lower():
            import lightgbm as lgb
            prediction = model.predict(data_df, predict_disable_shape_check=True)
        else:
            prediction = model.predict(data_df)
            
        print(f"Prediction result: {prediction}")
        
        # The result is a numpy array, get the first element
        result = int(prediction[0])
        # The model predicts 0 (Diabetic) or 1 (Pre-diabetic)
        return jsonify({'prediction': result})

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
