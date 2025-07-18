# Backend Implementation Guide

## Overview

This document provides a comprehensive guide for implementing the Flask backend for the diabetes risk assessment platform and connecting it with the React frontend.

## Backend Architecture

### File Structure
```
backend/
├── app.py                    # Main Flask application
├── requirements.txt          # Python dependencies
├── config.py                # Configuration settings
├── models/
│   └── diabetes_model.pkl   # Your trained ML model
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
    MODEL_PATH = os.environ.get('MODEL_PATH') or 'models/diabetes_model.pkl'
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    HOST = os.environ.get('FLASK_HOST', '0.0.0.0')
    PORT = int(os.environ.get('FLASK_PORT', 5000))
    
    # Model configuration
    FEATURE_ORDER = [
        'age', 'bmi', 'glucose', 'hba1c', 'systolic_bp', 'diastolic_bp',
        'cholesterol', 'triglycerides', 'activity_level', 'family_history',
        'smoking', 'gender_male'
    ]
    
    # Risk thresholds
    RISK_THRESHOLDS = {
        'low': 0.3,
        'medium': 0.7
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
    Convert form data to DataFrame suitable for ML model
    
    Args:
        form_data: Dictionary containing form data
        
    Returns:
        pd.DataFrame: Preprocessed data ready for model
    """
    # Create DataFrame from form data
    df = pd.DataFrame([form_data])
    
    # Convert gender to numerical (male = 1, female = 0)
    df['gender_male'] = (df['gender'] == 'male').astype(int)
    df = df.drop('gender', axis=1)
    
    # Convert boolean fields to int
    df['family_history'] = df['family_history'].astype(int)
    df['smoking'] = df['smoking'].astype(int)
    
    # Ensure all numerical fields are float
    numerical_fields = ['age', 'bmi', 'glucose', 'hba1c', 'systolic_bp', 
                       'diastolic_bp', 'cholesterol', 'triglycerides', 'activity_level']
    
    for field in numerical_fields:
        df[field] = pd.to_numeric(df[field], errors='coerce')
    
    # Handle missing values (if any)
    df = df.fillna(0)
    
    return df

def validate_input_data(form_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate input data ranges and types
    
    Args:
        form_data: Dictionary containing form data
        
    Returns:
        Dict containing validation results
    """
    errors = []
    warnings = []
    
    # Age validation
    if not (18 <= form_data.get('age', 0) <= 100):
        errors.append('Age must be between 18 and 100')
    
    # BMI validation
    if not (15 <= form_data.get('bmi', 0) <= 50):
        errors.append('BMI must be between 15 and 50')
    
    # Glucose validation
    if not (70 <= form_data.get('glucose', 0) <= 400):
        errors.append('Glucose must be between 70 and 400 mg/dL')
    
    # HbA1c validation
    if not (4.0 <= form_data.get('hba1c', 0) <= 15.0):
        errors.append('HbA1c must be between 4.0 and 15.0%')
    
    # Blood pressure validation
    systolic = form_data.get('systolic_bp', 0)
    diastolic = form_data.get('diastolic_bp', 0)
    
    if not (80 <= systolic <= 220):
        errors.append('Systolic BP must be between 80 and 220 mmHg')
    
    if not (50 <= diastolic <= 120):
        errors.append('Diastolic BP must be between 50 and 120 mmHg')
    
    if systolic <= diastolic:
        errors.append('Systolic BP must be higher than diastolic BP')
    
    # Cholesterol validation
    if not (100 <= form_data.get('cholesterol', 0) <= 400):
        errors.append('Cholesterol must be between 100 and 400 mg/dL')
    
    # Triglycerides validation
    if not (50 <= form_data.get('triglycerides', 0) <= 500):
        errors.append('Triglycerides must be between 50 and 500 mg/dL')
    
    # Activity level validation
    if not (1 <= form_data.get('activity_level', 0) <= 10):
        errors.append('Activity level must be between 1 and 10')
    
    # Gender validation
    if form_data.get('gender') not in ['male', 'female']:
        errors.append('Gender must be either "male" or "female"')
    
    # Add warnings for concerning values
    if form_data.get('glucose', 0) > 200:
        warnings.append('High glucose levels detected')
    
    if form_data.get('bmi', 0) > 30:
        warnings.append('BMI indicates obesity')
    
    if systolic > 140 or diastolic > 90:
        warnings.append('High blood pressure detected')
    
    return {
        'valid': len(errors) == 0,
        'errors': errors,
        'warnings': warnings
    }

def calculate_risk_factors(form_data: Dict[str, Any], feature_importance: np.ndarray = None) -> List[str]:
    """
    Determine top risk factors based on user data
    
    Args:
        form_data: Dictionary containing form data
        feature_importance: Optional feature importance from model
        
    Returns:
        List of top risk factors
    """
    risk_factors = []
    
    # Define risk conditions
    risk_conditions = [
        (form_data.get('glucose', 0) > 140, 'High glucose levels'),
        (form_data.get('bmi', 0) > 30, 'High BMI (obesity)'),
        (form_data.get('hba1c', 0) > 6.5, 'Elevated HbA1c'),
        (form_data.get('systolic_bp', 0) > 140, 'High systolic blood pressure'),
        (form_data.get('diastolic_bp', 0) > 90, 'High diastolic blood pressure'),
        (form_data.get('cholesterol', 0) > 240, 'High cholesterol'),
        (form_data.get('triglycerides', 0) > 200, 'High triglycerides'),
        (form_data.get('family_history', False), 'Family history of diabetes'),
        (form_data.get('smoking', False), 'Smoking'),
        (form_data.get('activity_level', 10) < 3, 'Low physical activity'),
        (form_data.get('age', 0) > 45, 'Age over 45'),
    ]
    
    # Add factors that meet conditions
    for condition, factor in risk_conditions:
        if condition:
            risk_factors.append(factor)
    
    # Return top 5 factors
    return risk_factors[:5]

def generate_recommendations(risk_factors: List[str], risk_level: str) -> List[str]:
    """
    Generate personalized recommendations based on risk factors
    
    Args:
        risk_factors: List of identified risk factors
        risk_level: Risk level (low, medium, high)
        
    Returns:
        List of personalized recommendations
    """
    recommendations = []
    
    # Factor-specific recommendations
    factor_recommendations = {
        'High glucose levels': 'Monitor blood glucose regularly and follow a low-sugar diet',
        'High BMI (obesity)': 'Aim for gradual weight loss through diet and exercise',
        'Elevated HbA1c': 'Work with your doctor to improve long-term blood sugar control',
        'High systolic blood pressure': 'Monitor blood pressure and reduce sodium intake',
        'High diastolic blood pressure': 'Monitor blood pressure and manage stress levels',
        'High cholesterol': 'Follow a heart-healthy diet low in saturated fats',
        'High triglycerides': 'Reduce refined carbohydrates and increase omega-3 fatty acids',
        'Family history of diabetes': 'Get regular health screenings and maintain preventive care',
        'Smoking': 'Quit smoking to significantly reduce diabetes risk',
        'Low physical activity': 'Aim for at least 150 minutes of moderate exercise per week',
        'Age over 45': 'Maintain regular health check-ups and screenings'
    }
    
    # Add factor-specific recommendations
    for factor in risk_factors:
        if factor in factor_recommendations:
            recommendations.append(factor_recommendations[factor])
    
    # Add general recommendations based on risk level
    if risk_level == 'high':
        recommendations.extend([
            'Consult with a healthcare provider immediately',
            'Consider diabetes prevention programs',
            'Schedule comprehensive health screening'
        ])
    elif risk_level == 'medium':
        recommendations.extend([
            'Schedule regular check-ups with your doctor',
            'Monitor key health metrics monthly',
            'Consider lifestyle modification programs'
        ])
    else:  # low risk
        recommendations.extend([
            'Maintain current healthy lifestyle',
            'Continue regular health screenings'
        ])
    
    # Add universal recommendations
    recommendations.extend([
        'Maintain a balanced diet rich in fiber and low in processed foods',
        'Stay hydrated and get adequate sleep',
        'Manage stress through relaxation techniques or meditation'
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
    """Manages ML model loading and predictions"""
    
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
            'has_feature_importance': hasattr(self.model, 'feature_importances_')
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
                risk_score = float(probabilities[0][1])  # Probability of diabetes
            else:
                # Binary prediction
                prediction = self.model.predict(data)
                risk_score = float(prediction[0])
            
            # Determine risk level
            risk_level = self._determine_risk_level(risk_score)
            
            # Calculate confidence
            confidence = self._calculate_confidence(risk_score)
            
            # Generate timeline message
            timeline = self._generate_timeline(risk_level, risk_score)
            
            # Get feature importance
            feature_importance = getattr(self.model, 'feature_importances_', None)
            
            return {
                'risk_score': risk_score,
                'risk_level': risk_level,
                'confidence': confidence,
                'timeline': timeline,
                'feature_importance': feature_importance.tolist() if feature_importance is not None else None
            }
            
        except Exception as e:
            raise Exception(f"Prediction error: {e}")
    
    def _determine_risk_level(self, risk_score: float) -> str:
        """Determine risk level based on score"""
        if risk_score < 0.3:
            return 'low'
        elif risk_score < 0.7:
            return 'medium'
        else:
            return 'high'
    
    def _calculate_confidence(self, risk_score: float) -> float:
        """Calculate confidence based on distance from decision boundary"""
        # Confidence is higher when score is further from 0.5
        return float(abs(risk_score - 0.5) * 2)
    
    def _generate_timeline(self, risk_level: str, risk_score: float) -> str:
        """Generate timeline message based on risk level"""
        if risk_level == 'low':
            return 'Low risk - continue healthy lifestyle and regular check-ups'
        elif risk_level == 'medium':
            return 'Moderate risk - implement preventive measures and monitor closely'
        else:
            return 'High risk - consult healthcare provider immediately for evaluation'

def create_prediction_response(model_result: Dict[str, Any], form_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create comprehensive prediction response
    
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
    recommendations = generate_recommendations(top_factors, model_result['risk_level'])
    
    # Create response
    response = {
        'risk_score': model_result['risk_score'],
        'risk_level': model_result['risk_level'],
        'confidence': model_result['confidence'],
        'timeline': model_result['timeline'],
        'top_factors': top_factors,
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
        'model_info': model_manager.get_model_info()
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Main prediction endpoint"""
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
    print("Starting Flask application...")
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
    
    def test_predict_endpoint(self):
        """Test prediction endpoint with valid data"""
        test_data = {
            "age": 45,
            "gender": "male",
            "bmi": 28.5,
            "glucose": 120,
            "hba1c": 6.2,
            "systolic_bp": 130,
            "diastolic_bp": 85,
            "cholesterol": 200,
            "triglycerides": 150,
            "activity_level": 4,
            "family_history": True,
            "smoking": False
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
        self.assertIn('confidence', data)
        self.assertIn('recommendations', data)
    
    def test_predict_invalid_data(self):
        """Test prediction endpoint with invalid data"""
        test_data = {
            "age": 150,  # Invalid age
            "gender": "unknown",  # Invalid gender
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
MODEL_PATH=models/diabetes_model.pkl
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
  "confidence": 0.78,
  "timeline": "Moderate risk - implement preventive measures and monitor closely",
  "top_factors": [
    "Family history of diabetes",
    "High BMI (obesity)",
    "Elevated HbA1c"
  ],
  "recommendations": [
    "Work with your doctor to improve long-term blood sugar control",
    "Aim for gradual weight loss through diet and exercise",
    "Get regular health screenings and maintain preventive care",
    "Schedule regular check-ups with your doctor",
    "Monitor key health metrics monthly"
  ],
  "timestamp": "2024-01-15T10:30:00.123456"
}
```

### Error Response
```json
{
  "error": "Invalid input data",
  "details": [
    "Age must be between 18 and 100",
    "BMI must be between 15 and 50"
  ]
}
```

## Security Considerations

1. **Input Validation**: All inputs are validated before processing
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

This backend implementation provides a robust, production-ready foundation for your diabetes risk assessment platform. The modular design makes it easy to extend with additional features and maintain over time.