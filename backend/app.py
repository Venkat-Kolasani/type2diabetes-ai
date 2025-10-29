import os
import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend requests

# --- 1. Model Loading ---

MODEL_DIR = 'model'
MODEL_FILE = 'model.pkl'
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_FILE)

model = None

def log_message(msg):
    """Helper to log messages both to console and startup_logs."""
    print(msg)
    startup_logs.append(msg)

def load_model():
    """Load the pre-trained model from disk."""
    global model
    try:
        if not os.path.exists(MODEL_PATH):
            log_message(f"ERROR: Model file not found at '{MODEL_PATH}'.")
            log_message(f"Current working directory: {os.getcwd()}")
            log_message(f"Contents of current directory: {os.listdir('.')}")
            if os.path.exists('model'):
                log_message(f"Contents of model directory: {os.listdir('model')}")
            else:
                log_message("Model directory does not exist")
            log_message("Please make sure your trained model is placed in the 'backend/model/' directory and named 'model.pkl'.")
            model = None
            return
            
        log_message(f"Loading model from: {MODEL_PATH}")
        
        # Load the trained model
        classifier = joblib.load(MODEL_PATH)
        log_message(f"Loaded model type: {type(classifier)}")
        
        # Load the preprocessing pipeline
        pipeline_path = os.path.join(MODEL_DIR, 'preprocessing_pipeline.pkl')
        if os.path.exists(pipeline_path):
            try:
                preprocessing_pipeline = joblib.load(pipeline_path)
                log_message(f"Loaded preprocessing pipeline type: {type(preprocessing_pipeline)}")
                
                # Handle both dict and non-dict preprocessing pipelines
                if isinstance(preprocessing_pipeline, dict):
                    log_message(f"Loaded preprocessing pipeline keys: {list(preprocessing_pipeline.keys())}")
                    
                    # Combine model and preprocessing into expected format
                    model = {
                        'classifier': classifier,
                        'scaler': preprocessing_pipeline.get('scaler'),
                        'poly': preprocessing_pipeline.get('poly_features'),
                        'selector': preprocessing_pipeline.get('feature_selector'),
                        'feature_names': preprocessing_pipeline.get('feature_names'),
                        'threshold': 0.5  # Default threshold
                    }
                    
                    log_message(f"✅ Model loaded successfully: {type(classifier).__name__}")
                    log_message(f"✅ Scaler: {type(model['scaler']).__name__ if model['scaler'] else 'None'}")
                    log_message(f"✅ Polynomial Features: {type(model['poly']).__name__ if model['poly'] else 'None'}")
                    log_message(f"✅ Feature Selector: {type(model['selector']).__name__ if model['selector'] else 'None'}")
                    log_message(f"🎯 Complete preprocessing pipeline loaded successfully!")
                else:
                    log_message(f"WARNING: Preprocessing pipeline is not a dict: {type(preprocessing_pipeline)}")
                    # Fallback to simple model format
                    model = {
                        'classifier': classifier,
                        'scaler': None,
                        'poly': None,
                        'selector': None,
                        'feature_names': None,
                        'threshold': 0.5
                    }
                    log_message(f"✅ Simple model loaded: {type(classifier).__name__}")
                    
            except Exception as pipeline_error:
                log_message(f"ERROR loading preprocessing pipeline: {pipeline_error}")
                log_message(f"Error traceback: {traceback.format_exc()}")
                log_message("Falling back to simple model...")
                # Fallback to simple model
                model = {
                    'classifier': classifier,
                    'scaler': None,
                    'poly': None,
                    'selector': None,
                    'feature_names': None,
                    'threshold': 0.5
                }
                log_message(f"✅ Simple model loaded: {type(classifier).__name__}")
            
        else:
            log_message("WARNING: Preprocessing pipeline not found. Using model only.")
            # If no preprocessing pipeline, assume it's a simple model
            if hasattr(classifier, 'predict'):
                model = {
                    'classifier': classifier,
                    'scaler': None,
                    'poly': None,
                    'selector': None,
                    'feature_names': None,
                    'threshold': 0.5
                }
                log_message(f"✅ Simple model loaded: {type(classifier).__name__}")
            else:
                log_message("ERROR: Loaded object doesn't have predict method")
                model = None
            
    except Exception as e:
        import traceback
        log_message("\n=== ERROR LOADING MODEL ===")
        log_message(f"Error type: {type(e).__name__}")
        log_message(f"Error message: {str(e)}")
        log_message("\nFull traceback:")
        log_message(traceback.format_exc())
        model = None

# Load model when module is imported (for Gunicorn/WSGI servers)
load_model()

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

# Global variable to store startup logs
startup_logs = []

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify service status."""
    status = 'ok' if model is not None else 'error'
    
    # Add debugging info about file system and model loading
    debug_info = {
        'current_dir': os.getcwd(),
        'files_in_current_dir': os.listdir('.'),
        'model_path_exists': os.path.exists(MODEL_PATH),
        'model_path': MODEL_PATH,
        'startup_logs': startup_logs[-20:] if startup_logs else []  # Last 20 log entries
    }
    
    if os.path.exists('model'):
        debug_info['model_dir_contents'] = os.listdir('model')
    else:
        debug_info['model_dir_exists'] = False
    
    # Try to load model and capture the specific error
    if model is None:
        try:
            import joblib
            test_model = joblib.load(MODEL_PATH)
            debug_info['model_load_test'] = {
                'success': True,
                'type': str(type(test_model)),
                'is_dict': isinstance(test_model, dict)
            }
            if isinstance(test_model, dict):
                debug_info['model_load_test']['keys'] = list(test_model.keys())
        except Exception as e:
            debug_info['model_load_test'] = {
                'success': False,
                'error': str(e),
                'error_type': str(type(e).__name__)
            }
    
    return jsonify({
        'status': status, 
        'model_loaded': model is not None,
        'debug': debug_info
    })

# --- 4. Application Startup ---

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    
    print("🚀 Starting Diabetes Risk Prediction Backend")
    print(f"🐍 Python version: {sys.version}")
    
    # Load model before starting
    load_model()
    
    if model is None:
        print("⚠️  Model failed to load, but starting server anyway")
    else:
        print("✅ Model loaded successfully")
    
    print(f"🌐 Starting server on 0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)

# For Gunicorn compatibility, make app available at module level
application = app
