# Backend Implementation Guide for BRFSS Dataset

## Overview

This document provides a comprehensive guide for implementing the Flask backend for the diabetes risk assessment platform using the BRFSS (Behavioral Risk Factor Surveillance System) dataset and connecting it with the React frontend.

## Backend Architecture

### File Structure
```
backend/
├── app.py                    # Main Flask application
├── requirements.txt          # Python dependencies
├── config.py                # Configuration settings
├── models/
│   └── brfss_diabetes_model.pkl   # Your trained ML model
├── utils/
│   ├── __init__.py
│   ├── data_preprocessing.py # Data preprocessing utilities
│   └── model_utils.py       # Model loading and prediction utilities
└── tests/
    ├── __init__.py
    └── test_api.py          # API endpoint tests
```

## Step-by-Step Implementation

### Step 1: Create Backend Directory Structure

```bash
mkdir backend
cd backend
mkdir models utils tests
touch app.py requirements.txt config.py
touch utils/__init__.py utils/data_preprocessing.py utils/model_utils.py
touch tests/__init__.py tests/test_api.py
```

### Step 2: Install Dependencies

Create `requirements.txt`:
```txt
flask==2.3.3
flask-cors==4.0.0
scikit-learn==1.3.0
pandas==2.0.3
numpy==1.24.3
joblib==1.3.2
python-dotenv==1.0.0
```

Install dependencies:
```bash
pip install -r requirements.txt
```

### Step 3: Configuration Setup

Create `config.py`:
```python
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    MODEL_PATH = os.environ.get('MODEL_PATH') or 'models/brfss_diabetes_model.pkl'
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    HOST = os.environ.get('FLASK_HOST', '0.0.0.0')
    PORT = int(os.environ.get('FLASK_PORT', 5000))
    
    # Model configuration for BRFSS dataset
    FEATURE_ORDER = [
        'age', 'sex', 'education', 'income', 'bmi', 'high_blood_pressure',
        'high_cholesterol', 'cholesterol_check', 'general_health',
        'difficulty_walking', 'couldnt_see_doctor', 'has_healthcare',
        'smoked_100_cigarettes', 'heavy_alcohol', 'physical_activity',
        'fruit_consumption', 'vegetable_consumption', 'poor_mental_health',
        'poor_physical_health', 'history_stroke', 'history_heart_disease'
    ]
    
    # Risk thresholds for diabetes status
    DIABETES_THRESHOLDS = {
        'no_diabetes': 0.3,    # 0: no-diabetes
        'pre_diabetic': 0.6    # 1: pre-diabetic, 2: diabetic
    }
```

### Step 4: Data Preprocessing Module

Create `utils/data_preprocessing.py`:
```python
import pandas as pd
import numpy as np
from typing import Dict, List, Any

def preprocess_form_data(form_data: Dict[str, Any]) -> pd.DataFrame:
    """
    Convert BRFSS form data to DataFrame suitable for ML model
    
    Args:
        form_data: Dictionary containing BRFSS form data
        
    Returns:
        pd.DataFrame: Preprocessed data ready for model
    """
    # Create DataFrame from form data
    df = pd.DataFrame([form_data])
    
    # Convert categorical variables to numerical
    # Sex encoding
    sex_mapping = {'male': 1, 'female': 0, 'other': 2}
    df['sex'] = df['sex'].map(sex_mapping)
    
    # Education encoding
    education_mapping = {
        'never_attended': 0,
        'grades_1_8': 1,
        'grades_9_11': 2,
        'high_school': 3,
        'some_college': 4,
        'college_graduate': 5
    }
    df['education'] = df['education'].map(education_mapping)
    
    # Income encoding
    income_mapping = {
        'under_15000': 0,
        '15000_24999': 1,
        '25000_34999': 2,
        '35000_49999': 3,
        '50000_74999': 4,
        '75000_plus': 5
    }
    df['income'] = df['income'].map(income_mapping)
    
    # Binary variables (Yes/No to 1/0)
    binary_fields = [
        'high_blood_pressure', 'high_cholesterol', 'cholesterol_check',
        'difficulty_walking', 'couldnt_see_doctor', 'has_healthcare',
        'smoked_100_cigarettes', 'heavy_alcohol', 'physical_activity',
        'history_stroke', 'history_heart_disease'
    ]
    
    for field in binary_fields:
        df[field] = (df[field] == 'yes').astype(int)
    
    # General health encoding
    health_mapping = {
        'excellent': 5,
        'very_good': 4,
        'good': 3,
        'fair': 2,
        'poor': 1
    }
    df['general_health'] = df['general_health'].map(health_mapping)
    
    # Ensure all numerical fields are float
    numerical_fields = ['age', 'bmi', 'fruit_consumption', 'vegetable_consumption',
                       'poor_mental_health', 'poor_physical_health']
    
    for field in numerical_fields:
        df[field] = pd.to_numeric(df[field], errors='coerce')
    
    # Handle missing values (if any)
    df = df.fillna(0)
    
    return df

def validate_input_data(form_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate BRFSS input data ranges and types
    
    Args:
        form_data: Dictionary containing form data
        
    Returns:
        Dict containing validation results
    """
    errors = []
    warnings = []
    
    # Age validation
    if not (18 <= form_data.get('age', 0) <= 99):
        errors.append('Age must be between 18 and 99')
    
    # BMI validation
    if not (15 <= form_data.get('bmi', 0) <= 50):
        errors.append('BMI must be between 15 and 50')
    
    # Sex validation
    if form_data.get('sex') not in ['male', 'female', 'other']:
        errors.append('Sex must be male, female, or other')
    
    # Education validation
    valid_education = ['never_attended', 'grades_1_8', 'grades_9_11', 
                      'high_school', 'some_college', 'college_graduate']
    if form_data.get('education') not in valid_education:
        errors.append('Invalid education level')
    
    # Income validation
    valid_income = ['under_15000', '15000_24999', '25000_34999', 
                   '35000_49999', '50000_74999', '75000_plus']
    if form_data.get('income') not in valid_income:
        errors.append('Invalid income level')
    
    # Fruit/vegetable consumption validation
    if not (0 <= form_data.get('fruit_consumption', 0) <= 10):
        errors.append('Fruit consumption must be between 0 and 10 servings')
    
    if not (0 <= form_data.get('vegetable_consumption', 0) <= 10):
        errors.append('Vegetable consumption must be between 0 and 10 servings')
    
    # Mental/physical health days validation
    if not (0 <= form_data.get('poor_mental_health', 0) <= 30):
        errors.append('Poor mental health days must be between 0 and 30')
    
    if not (0 <= form_data.get('poor_physical_health', 0) <= 30):
        errors.append('Poor physical health days must be between 0 and 30')
    
    # Binary field validation
    binary_fields = ['high_blood_pressure', 'high_cholesterol', 'cholesterol_check',
                    'difficulty_walking', 'couldnt_see_doctor', 'has_healthcare',
                    'smoked_100_cigarettes', 'heavy_alcohol', 'physical_activity',
                    'history_stroke', 'history_heart_disease']
    
    for field in binary_fields:
        if form_data.get(field) not in ['yes', 'no']:
            errors.append(f'{field} must be yes or no')
    
    # General health validation
    valid_health = ['excellent', 'very_good', 'good', 'fair', 'poor']
    if form_data.get('general_health') not in valid_health:
        errors.append('Invalid general health rating')
    
    # Add warnings for concerning values
    if form_data.get('bmi', 0) > 30:
        warnings.append('BMI indicates obesity')
    
    if form_data.get('poor_mental_health', 0) > 10:
        warnings.append('High number of poor mental health days detected')
    
    if form_data.get('poor_physical_health', 0) > 10:
        warnings.append('High number of poor physical health days detected')
    
    if form_data.get('fruit_consumption', 0) < 1:
        warnings.append('Low fruit consumption detected')
    
    if form_data.get('vegetable_consumption', 0) < 2:
        warnings.append('Low vegetable consumption detected')
    
    return {
        'valid': len(errors) == 0,
        'errors': errors,
        'warnings': warnings
    }

def calculate_risk_factors(form_data: Dict[str, Any], feature_importance: np.ndarray = None) -> List[str]:
    """
    Determine top risk factors based on BRFSS user data
    
    Args:
        form_data: Dictionary containing form data
        feature_importance: Optional feature importance from model
        
    Returns:
        List of top risk factors
    """
    risk_factors = []
    
    # Define risk conditions for BRFSS data
    risk_conditions = [
        (form_data.get('bmi', 0) > 30, 'High BMI (obesity)'),
        (form_data.get('high_blood_pressure') == 'yes', 'High blood pressure'),
        (form_data.get('high_cholesterol') == 'yes', 'High cholesterol'),
        (form_data.get('smoked_100_cigarettes') == 'yes', 'Smoking history'),
        (form_data.get('heavy_alcohol') == 'yes', 'Heavy alcohol consumption'),
        (form_data.get('physical_activity') == 'no', 'Low physical activity'),
        (form_data.get('history_stroke') == 'yes', 'History of stroke'),
        (form_data.get('history_heart_disease') == 'yes', 'History of heart disease'),
        (form_data.get('poor_mental_health', 0) > 10, 'Poor mental health'),
        (form_data.get('poor_physical_health', 0) > 10, 'Poor physical health'),
        (form_data.get('fruit_consumption', 0) < 1, 'Low fruit consumption'),
        (form_data.get('vegetable_consumption', 0) < 2, 'Low vegetable consumption'),
        (form_data.get('age', 0) > 45, 'Age over 45'),
        (form_data.get('general_health') in ['fair', 'poor'], 'Poor general health'),
        (form_data.get('difficulty_walking') == 'yes', 'Difficulty walking'),
        (form_data.get('couldnt_see_doctor') == 'yes', 'Limited healthcare access'),
        (form_data.get('has_healthcare') == 'no', 'No healthcare coverage')
    ]
    
    # Add factors that meet conditions
    for condition, factor in risk_conditions:
        if condition:
            risk_factors.append(factor)
    
    # Return top 5 factors
    return risk_factors[:5]

def generate_recommendations(risk_factors: List[str], risk_level: str, diabetes_status: int) -> List[str]:
    """
    Generate personalized recommendations based on BRFSS risk factors
    
    Args:
        risk_factors: List of identified risk factors
        risk_level: Risk level (low, medium, high)
        diabetes_status: Diabetes status (0: no-diabetes, 1: pre-diabetic, 2: diabetic)
        
    Returns:
        List of personalized recommendations
    """
    recommendations = []
    
    # Factor-specific recommendations
    factor_recommendations = {
        'High BMI (obesity)': 'Aim for gradual weight loss through diet and exercise',
        'High blood pressure': 'Monitor blood pressure and reduce sodium intake',
        'High cholesterol': 'Follow a heart-healthy diet low in saturated fats',
        'Smoking history': 'Quit smoking to significantly reduce diabetes risk',
        'Heavy alcohol consumption': 'Reduce alcohol consumption to moderate levels',
        'Low physical activity': 'Aim for at least 150 minutes of moderate exercise per week',
        'History of stroke': 'Work closely with healthcare provider for stroke prevention',
        'History of heart disease': 'Follow cardiac rehabilitation and prevention guidelines',
        'Poor mental health': 'Consider seeking professional mental health support',
        'Poor physical health': 'Address underlying health conditions with medical care',
        'Low fruit consumption': 'Increase fruit intake to 2-4 servings per day',
        'Low vegetable consumption': 'Increase vegetable intake to 3-5 servings per day',
        'Age over 45': 'Maintain regular health check-ups and screenings',
        'Poor general health': 'Work with healthcare provider to improve overall health',
        'Difficulty walking': 'Consult with physical therapist for mobility improvement',
        'Limited healthcare access': 'Explore community health resources and programs',
        'No healthcare coverage': 'Research healthcare options and insurance programs'
    }
    
    # Add factor-specific recommendations
    for factor in risk_factors:
        if factor in factor_recommendations:
            recommendations.append(factor_recommendations[factor])
    
    # Add diabetes status-specific recommendations
    if diabetes_status == 2:  # Diabetic
        recommendations.extend([
            'Consult with a healthcare provider immediately for diabetes management',
            'Monitor blood glucose levels regularly',
            'Follow a diabetes-friendly diet plan',
            'Consider diabetes education programs'
        ])
    elif diabetes_status == 1:  # Pre-diabetic
        recommendations.extend([
            'Implement lifestyle changes to prevent diabetes progression',
            'Monitor blood glucose levels regularly',
            'Consider diabetes prevention programs',
            'Schedule regular check-ups with your doctor'
        ])
    else:  # No diabetes
        recommendations.extend([
            'Maintain current healthy lifestyle',
            'Continue regular health screenings',
            'Focus on preventive care measures'
        ])
    
    # Add general recommendations based on risk level
    if risk_level == 'high':
        recommendations.extend([
            'Schedule comprehensive health screening',
            'Consider working with a health coach or nutritionist'
        ])
    elif risk_level == 'medium':
        recommendations.extend([
            'Monitor key health metrics monthly',
            'Consider lifestyle modification programs'
        ])
    
    # Add universal recommendations
    recommendations.extend([
        'Maintain a balanced diet rich in fiber and low in processed foods',
        'Stay hydrated and get adequate sleep',
        'Manage stress through relaxation techniques or meditation',
        'Build a support network for health goals'
    ])
    
    # Remove duplicates and return top 8
    return list(dict.fromkeys(recommendations))[:8]
```

### Step 5: Model Utilities Module

Create `utils/model_utils.py`:
```python
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, Optional, Tuple
import os
from .data_preprocessing import calculate_risk_factors, generate_recommendations

class ModelManager:
    """Manages ML model loading and predictions for BRFSS dataset"""
    
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None
        self.feature_names = None
        self.load_model()
    
    def load_model(self) -> bool:
        """
        Load the ML model from file
        
        Returns:
            bool: True if model loaded successfully
        """
        try:
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"Model file not found: {self.model_path}")
            
            self.model = joblib.load(self.model_path)
            
            # Get feature names if available
            if hasattr(self.model, 'feature_names_in_'):
                self.feature_names = self.model.feature_names_in_
            
            print(f"Model loaded successfully from {self.model_path}")
            return True
            
        except Exception as e:
            print(f"Error loading model: {e}")
            self.model = None
            return False
    
    def is_model_loaded(self) -> bool:
        """Check if model is loaded"""
        return self.model is not None
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get model information"""
        if not self.model:
            return {'error': 'Model not loaded'}
        
        info = {
            'model_type': type(self.model).__name__,
            'feature_count': len(self.feature_names) if self.feature_names else 'Unknown',
            'has_predict_proba': hasattr(self.model, 'predict_proba'),
            'has_feature_importance': hasattr(self.model, 'feature_importances_'),
            'dataset': 'BRFSS'
        }
        
        return info
    
    def predict(self, data: pd.DataFrame) -> Dict[str, Any]:
        """
        Make prediction using the loaded model
        
        Args:
            data: Preprocessed data DataFrame
            
        Returns:
            Dict containing prediction results
        """
        if not self.model:
            raise Exception("Model not loaded")
        
        try:
            # Make prediction
            if hasattr(self.model, 'predict_proba'):
                # Get probability prediction
                probabilities = self.model.predict_proba(data)
                
                # For multi-class classification (0: no-diabetes, 1: pre-diabetic, 2: diabetic)
                if probabilities.shape[1] == 3:
                    diabetes_status = int(np.argmax(probabilities[0]))
                    risk_score = float(np.max(probabilities[0]))
                else:
                    # Binary classification
                    risk_score = float(probabilities[0][1])
                    diabetes_status = 2 if risk_score > 0.5 else 0
            else:
                # Direct prediction
                prediction = self.model.predict(data)
                diabetes_status = int(prediction[0])
                risk_score = float(prediction[0]) / 2.0  # Normalize to 0-1
            
            # Determine risk level
            risk_level = self._determine_risk_level(risk_score, diabetes_status)
            
            # Calculate confidence
            confidence = self._calculate_confidence(risk_score)
            
            # Generate timeline
            timeline = self._generate_timeline(risk_level, diabetes_status)
            
            # Get feature importance
            feature_importance = getattr(self.model, 'feature_importances_', None)
            
            return {
                'risk_score': risk_score,
                'risk_level': risk_level,
                'diabetes_status': diabetes_status,
                'confidence': confidence,
                'timeline': timeline,
                'feature_importance': feature_importance.tolist() if feature_importance is not None else None
            }
            
        except Exception as e:
            raise Exception(f"Prediction error: {e}")
    
    def _determine_risk_level(self, risk_score: float, diabetes_status: int) -> str:
        """Determine risk level based on score and diabetes status"""
        if diabetes_status == 2:  # Diabetic
            return 'high'
        elif diabetes_status == 1:  # Pre-diabetic
            return 'medium'
        else:  # No diabetes
            if risk_score < 0.3:
                return 'low'
            elif risk_score < 0.6:
                return 'medium'
            else:
                return 'high'
    
    def _calculate_confidence(self, risk_score: float) -> float:
        """Calculate confidence based on distance from decision boundary"""
        # Confidence is higher when score is further from 0.5
        return float(abs(risk_score - 0.5) * 2)
    
    def _generate_timeline(self, risk_level: str, diabetes_status: int) -> List[Dict[str, Any]]:
        """Generate timeline predictions based on risk level and diabetes status"""
        if diabetes_status == 2:  # Diabetic
            return [
                {'years': 1, 'risk': 0.85},
                {'years': 3, 'risk': 0.90},
                {'years': 5, 'risk': 0.95},
                {'years': 10, 'risk': 0.98}
            ]
        elif diabetes_status == 1:  # Pre-diabetic
            return [
                {'years': 1, 'risk': 0.60},
                {'years': 3, 'risk': 0.75},
                {'years': 5, 'risk': 0.85},
                {'years': 10, 'risk': 0.92}
            ]
        else:  # No diabetes
            base_risk = 0.2 if risk_level == 'medium' else 0.1
            return [
                {'years': 1, 'risk': base_risk},
                {'years': 3, 'risk': base_risk * 1.2},
                {'years': 5, 'risk': base_risk * 1.5},
                {'years': 10, 'risk': base_risk * 2.0}
            ]

def create_prediction_response(model_result: Dict[str, Any], form_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create comprehensive prediction response for BRFSS data
    
    Args:
        model_result: Result from model prediction
        form_data: Original form data
        
    Returns:
        Dict containing complete prediction response
    """
    from datetime import datetime
    
    # Calculate risk factors
    top_factors = calculate_risk_factors(form_data, model_result.get('feature_importance'))
    
    # Generate recommendations
    recommendations = generate_recommendations(
        top_factors, 
        model_result['risk_level'], 
        model_result['diabetes_status']
    )
    
    # Create response
    response = {
        'risk_score': model_result['risk_score'],
        'risk_level': model_result['risk_level'],
        'diabetes_status': model_result['diabetes_status'],
        'confidence': model_result['confidence'],
        'timeline': model_result['timeline'],
        'top_factors': [{'factor': factor, 'impact': 0.2} for factor in top_factors],
        'recommendations': recommendations,
        'timestamp': datetime.now().isoformat()
    }
    
    return response
```

### Step 6: Main Flask Application

Create `app.py`:
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.data_preprocessing import preprocess_form_data, validate_input_data
from utils.model_utils import ModelManager, create_prediction_response
from config import Config
import traceback
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for React frontend
CORS(app, origins=['http://localhost:5173', 'http://localhost:3000'])

# Initialize model manager
model_manager = ModelManager(app.config['MODEL_PATH'])

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': model_manager.is_model_loaded(),
        'model_info': model_manager.get_model_info(),
        'dataset': 'BRFSS'
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Main prediction endpoint for BRFSS data"""
    try:
        # Get JSON data from request
        if not request.is_json:
            return jsonify({'error': 'Content-Type must be application/json'}), 400
        
        form_data = request.get_json()
        
        if not form_data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Validate input data
        validation_result = validate_input_data(form_data)
        
        if not validation_result['valid']:
            return jsonify({
                'error': 'Invalid input data',
                'details': validation_result['errors']
            }), 400
        
        # Check if model is loaded
        if not model_manager.is_model_loaded():
            return jsonify({'error': 'Model not available'}), 500
        
        # Preprocess data
        processed_data = preprocess_form_data(form_data)
        
        # Ensure correct feature order
        feature_order = app.config['FEATURE_ORDER']
        processed_data = processed_data[feature_order]
        
        # Make prediction
        model_result = model_manager.predict(processed_data)
        
        # Create comprehensive response
        response = create_prediction_response(model_result, form_data)
        
        # Add warnings if any
        if validation_result['warnings']:
            response['warnings'] = validation_result['warnings']
        
        return jsonify(response)
        
    except Exception as e:
        # Log error for debugging
        app.logger.error(f"Prediction error: {str(e)}")
        app.logger.error(traceback.format_exc())
        
        return jsonify({
            'error': 'Internal server error',
            'message': str(e) if app.config['DEBUG'] else 'Prediction failed'
        }), 500

@app.route('/api/model/info', methods=['GET'])
def model_info():
    """Get model information"""
    if not model_manager.is_model_loaded():
        return jsonify({'error': 'Model not loaded'}), 500
    
    return jsonify(model_manager.get_model_info())

@app.route('/api/model/reload', methods=['POST'])
def reload_model():
    """Reload the model"""
    try:
        success = model_manager.load_model()
        if success:
            return jsonify({'message': 'Model reloaded successfully'})
        else:
            return jsonify({'error': 'Failed to reload model'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("Starting Flask application for BRFSS dataset...")
    print(f"Model loaded: {model_manager.is_model_loaded()}")
    
    app.run(
        debug=app.config['DEBUG'],
        host=app.config['HOST'],
        port=app.config['PORT']
    )
```

### Step 7: Frontend Integration

Update `src/pages/Demo.tsx` to connect with the backend:

```typescript
// In the onSubmit function, replace the mock prediction with:
const onSubmit = async (data: FormData) => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Prediction failed');
    }
    
    const result = await response.json();
    setResult(result);
    
    // Show warnings if any
    if (result.warnings && result.warnings.length > 0) {
      console.warn('Prediction warnings:', result.warnings);
    }
    
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred');
    console.error('Prediction error:', err);
  } finally {
    setIsLoading(false);
  }
};
```

## Testing Your Integration

### Step 8: Create Test Suite

Create `tests/test_api.py`:
```python
import unittest
import json
from app import app
import os

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = self.app.get('/api/health')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
        self.assertEqual(data['dataset'], 'BRFSS')
    
    def test_predict_endpoint(self):
        """Test prediction endpoint with valid BRFSS data"""
        test_data = {
            "age": 45,
            "sex": "male",
            "education": "college_graduate",
            "income": "50000_74999",
            "bmi": 28.5,
            "high_blood_pressure": "no",
            "high_cholesterol": "no",
            "cholesterol_check": "yes",
            "general_health": "good",
            "difficulty_walking": "no",
            "couldnt_see_doctor": "no",
            "has_healthcare": "yes",
            "smoked_100_cigarettes": "no",
            "heavy_alcohol": "no",
            "physical_activity": "yes",
            "fruit_consumption": 2.5,
            "vegetable_consumption": 3.0,
            "poor_mental_health": 3,
            "poor_physical_health": 2,
            "history_stroke": "no",
            "history_heart_disease": "no"
        }
        
        response = self.app.post('/api/predict',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        # Check if model is loaded
        if response.status_code == 500:
            # Model not loaded - expected if no model file
            return
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('risk_score', data)
        self.assertIn('risk_level', data)
        self.assertIn('diabetes_status', data)
        self.assertIn('confidence', data)
        self.assertIn('recommendations', data)
        
        # Check diabetes status is valid
        self.assertIn(data['diabetes_status'], [0, 1, 2])
    
    def test_predict_invalid_data(self):
        """Test prediction endpoint with invalid data"""
        test_data = {
            "age": 150,  # Invalid age
            "sex": "unknown",  # Invalid sex
            "bmi": 5  # Invalid BMI
        }
        
        response = self.app.post('/api/predict',
                               data=json.dumps(test_data),
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
```

### Step 9: Environment Setup

Create `.env` file in backend directory:
```env
FLASK_DEBUG=True
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
MODEL_PATH=models/brfss_diabetes_model.pkl
SECRET_KEY=your-secret-key-here
```

### Step 10: Run Tests

```bash
# Run backend tests
cd backend
python -m pytest tests/ -v

# Or run with unittest
python -m unittest tests.test_api -v
```

## Production Deployment

### Environment Configuration
- Set `FLASK_DEBUG=False` in production
- Use proper secret key
- Configure proper CORS origins
- Set up logging
- Use production WSGI server (gunicorn)

### Docker Setup (Optional)

Create `Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

## API Response Examples

### Successful Prediction
```json
{
  "risk_score": 0.35,
  "risk_level": "medium",
  "diabetes_status": 1,
  "confidence": 0.78,
  "timeline": [
    {"years": 1, "risk": 0.60},
    {"years": 3, "risk": 0.75},
    {"years": 5, "risk": 0.85},
    {"years": 10, "risk": 0.92}
  ],
  "top_factors": [
    {"factor": "High BMI (obesity)", "impact": 0.2},
    {"factor": "Age over 45", "impact": 0.2},
    {"factor": "Low physical activity", "impact": 0.2}
  ],
  "recommendations": [
    "Aim for gradual weight loss through diet and exercise",
    "Implement lifestyle changes to prevent diabetes progression",
    "Monitor blood glucose levels regularly",
    "Consider diabetes prevention programs",
    "Schedule regular check-ups with your doctor",
    "Maintain a balanced diet rich in fiber and low in processed foods",
    "Stay hydrated and get adequate sleep",
    "Manage stress through relaxation techniques or meditation"
  ],
  "timestamp": "2024-01-15T10:30:00.123456"
}
```

### Error Response
```json
{
  "error": "Invalid input data",
  "details": [
    "Age must be between 18 and 99",
    "BMI must be between 15 and 50"
  ]
}
```

## Security Considerations

1. **Input Validation**: All BRFSS inputs are validated before processing
2. **Error Handling**: Sensitive information is not exposed in error messages
3. **CORS**: Configure CORS properly for your domain
4. **Rate Limiting**: Consider implementing rate limiting for production
5. **Authentication**: Add authentication if needed for production use

## Performance Optimization

1. **Model Loading**: Model is loaded once on startup
2. **Caching**: Consider implementing Redis for caching frequent predictions
3. **Async Processing**: Use async/await for I/O operations
4. **Database**: Add database for storing predictions and analytics

## Monitoring and Logging

1. **Health Checks**: Use `/api/health` endpoint for monitoring
2. **Logging**: Configure proper logging for errors and requests
3. **Metrics**: Track prediction accuracy and response times
4. **Alerts**: Set up alerts for model failures or high error rates

This backend implementation provides a robust, production-ready foundation for your BRFSS-based diabetes risk assessment platform. The modular design makes it easy to extend with additional features and maintain over time.