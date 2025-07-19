# Diabetes Risk Assessment Platform - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Frontend Architecture](#frontend-architecture)
4. [Component Documentation](#component-documentation)
5. [Pages Documentation](#pages-documentation)
6. [UI Components](#ui-components)
7. [Data Flow](#data-flow)
8. [Flask Backend Implementation](#flask-backend-implementation)
9. [ML Model Integration](#ml-model-integration)
10. [API Endpoints](#api-endpoints)
11. [Setup Instructions](#setup-instructions)
12. [Troubleshooting](#troubleshooting)

## Project Overview

This is a comprehensive diabetes risk assessment platform built with React, TypeScript, and Tailwind CSS on the frontend, designed to integrate with a Flask backend and machine learning model for real-time predictions.

### Key Features
- Interactive form for health data collection
- Real-time risk assessment using ML model
- Visual risk representation with charts
- Responsive design with dark/light theme support
- Comprehensive results with recommendations

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Backend**: Flask (Python)
- **ML**: Scikit-learn, Pandas, NumPy

## Project Structure

```
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── placeholder.svg
├── src/
│   ├── components/
│   │   ├── charts/           # Chart components
│   │   ├── demo/             # Demo page components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── pages/                # Page components
│   ├── App.tsx               # Main App component
│   ├── index.css             # Global styles & design tokens
│   └── main.tsx              # Application entry point
├── backend/                  # Flask backend (to be created)
│   ├── app.py               # Flask application
│   ├── requirements.txt     # Python dependencies
│   ├── models/              # ML model directory
│   └── utils/               # Helper functions
├── documentation.md          # This file
└── backend.md               # Backend documentation
```

## Frontend Architecture

### Design System
The project uses a comprehensive design system with:
- **Color Tokens**: HSL-based semantic colors in `index.css`
- **Component Variants**: Customizable UI components with multiple variants
- **Typography**: Consistent font scales and weights
- **Spacing**: Systematic spacing using Tailwind utilities
- **Responsive Design**: Mobile-first approach with breakpoints

### Key Files
- `index.css`: Design tokens, CSS variables, and global styles
- `tailwind.config.ts`: Tailwind configuration with custom theme
- `lib/utils.ts`: Utility functions for className merging

## Component Documentation

### Charts Components (`src/components/charts/`)

#### ConfusionMatrix.tsx
```typescript
// Displays confusion matrix visualization
interface ConfusionMatrixProps {
  data: number[][];
  labels: string[];
}
```

#### FeatureImportance.tsx
```typescript
// Shows feature importance in ML model
interface FeatureImportanceProps {
  features: { name: string; importance: number }[];
}
```

#### ModelComparison.tsx
```typescript
// Compares different ML models
interface ModelComparisonProps {
  models: { name: string; accuracy: number; precision: number; recall: number }[];
}
```

#### ROCCurve.tsx
```typescript
// Displays ROC curve for model evaluation
interface ROCCurveProps {
  data: { fpr: number; tpr: number }[];
  auc: number;
}
```

### Demo Components (`src/components/demo/`)

#### InputForm.tsx
**Purpose**: Collects user health data for risk assessment
**Key Features**:
- Form validation using React Hook Form
- Organized sections: Demographics, Health Metrics, Blood Pressure, Lifestyle
- Real-time validation with error messages
- Responsive design

```typescript
interface InputFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  disabled: boolean;
}

// Form sections:
// 1. Demographics: Age (slider), Gender (radio), BMI (input)
// 2. Health Metrics: Glucose, HbA1c, Cholesterol, Triglycerides
// 3. Blood Pressure: Systolic and Diastolic
// 4. Lifestyle: Activity Level, Family History, Smoking Status
```

#### ResultsPanel.tsx
**Purpose**: Displays prediction results and recommendations
**Key Features**:
- Risk level visualization with color coding
- Progress bars for risk scores
- Timeline predictions
- Top risk factors identification
- Personalized recommendations
- Medical disclaimer

```typescript
interface ResultsPanelProps {
  result: PredictionResult;
}

// Risk levels: Low (green), Medium (orange), High (red)
// Components: Badge, Progress, Card, Alert
```

#### RiskVisualization.tsx
**Purpose**: Visual representation of risk score using pie chart
**Key Features**:
- Donut chart showing risk percentage
- Dynamic color based on risk level
- Centered risk score display
- Responsive design

```typescript
interface RiskVisualizationProps {
  riskScore: number; // 0-1 scale
}

// Colors: Green (<30%), Orange (30-70%), Red (>70%)
```

### Layout Components (`src/components/layout/`)

#### Navigation.tsx
**Purpose**: Main navigation component
**Features**:
- Responsive navigation menu
- Active route highlighting
- Mobile-friendly hamburger menu
- Theme integration

#### Footer.tsx
**Purpose**: Site footer with links and information
**Features**:
- Copyright information
- Social media links
- Additional navigation

## Pages Documentation

### Index.tsx
**Purpose**: Homepage/landing page
**Content**: Welcome message, platform introduction, navigation to demo

### About.tsx
**Purpose**: Information about the platform
**Content**: Platform description, methodology, team information

### Demo.tsx
**Purpose**: Main diabetes risk assessment interface
**Key Features**:
- Form management with React Hook Form
- State management for loading, results, and errors
- API integration (currently mocked)
- Result display and form reset functionality

```typescript
export type FormData = {
  age: number;
  gender: 'male' | 'female';
  bmi: number;
  glucose: number;
  hba1c: number;
  systolic_bp: number;
  diastolic_bp: number;
  cholesterol: number;
  triglycerides: number;
  activity_level: number;
  family_history: boolean;
  smoking: boolean;
};

export type PredictionResult = {
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high';
  confidence: number;
  timeline: string;
  top_factors: string[];
  recommendations: string[];
  timestamp: string;
};
```

### Landing.tsx
**Purpose**: Landing page for new users
**Content**: Hero section, features overview, call-to-action

### Research.tsx
**Purpose**: Research methodology and findings
**Content**: ML model information, data sources, validation results

### Results.tsx
**Purpose**: Historical results and analytics
**Content**: Past predictions, trends, aggregate statistics

### NotFound.tsx
**Purpose**: 404 error page
**Content**: Error message and navigation back to home

## UI Components

The project uses Shadcn/ui components with Radix UI primitives. Key components include:

- **Form Components**: Input, Select, Checkbox, Radio Group, Slider
- **Layout Components**: Card, Separator, Tabs, Accordion
- **Feedback Components**: Alert, Toast, Progress, Badge
- **Navigation Components**: Button, Navigation Menu, Breadcrumb
- **Overlay Components**: Dialog, Popover, Tooltip, Sheet

All components are customizable through the design system and support dark/light themes.

## Data Flow

### Current Flow (Frontend Only)
1. User fills form in `InputForm.tsx`
2. Form data validated using React Hook Form
3. On submit, `Demo.tsx` calls mock prediction function
4. Results displayed in `ResultsPanel.tsx` and `RiskVisualization.tsx`

### Planned Flow (With Backend)
1. User fills form → Frontend validation
2. Form data sent to Flask backend via POST `/api/predict`
3. Backend preprocesses data and runs ML model
4. Prediction results returned to frontend
5. Results displayed with visualizations

## Flask Backend Implementation

### Backend Structure
```
backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── models/
│   └── diabetes_model.pkl  # Trained ML model
├── utils/
│   ├── __init__.py
│   ├── data_preprocessing.py  # Data preprocessing functions
│   └── model_utils.py         # Model loading and prediction utilities
└── config.py           # Configuration settings
```

### Required Dependencies (requirements.txt)
```
flask==2.3.3
flask-cors==4.0.0
scikit-learn==1.3.0
pandas==2.0.3
numpy==1.24.3
joblib==1.3.2
```

### Flask Application (app.py)
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from utils.data_preprocessing import preprocess_data
from utils.model_utils import load_model, make_prediction
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load ML model on startup
model = load_model('models/diabetes_model.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        data = request.get_json()
        
        # Preprocess data
        processed_data = preprocess_data(data)
        
        # Make prediction
        prediction = make_prediction(model, processed_data)
        
        # Return structured response
        return jsonify({
            'risk_score': float(prediction['risk_score']),
            'risk_level': prediction['risk_level'],
            'confidence': float(prediction['confidence']),
            'timeline': prediction['timeline'],
            'top_factors': prediction['top_factors'],
            'recommendations': prediction['recommendations'],
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

### Data Preprocessing (utils/data_preprocessing.py)
```python
import pandas as pd
import numpy as np

def preprocess_data(form_data):
    """
    Preprocess form data for ML model prediction
    """
    # Create DataFrame from form data
    df = pd.DataFrame([form_data])
    
    # Convert gender to numerical
    df['gender_male'] = (df['gender'] == 'male').astype(int)
    df = df.drop('gender', axis=1)
    
    # Ensure all required features are present
    required_features = [
        'age', 'bmi', 'glucose', 'hba1c', 'systolic_bp', 'diastolic_bp',
        'cholesterol', 'triglycerides', 'activity_level', 'family_history',
        'smoking', 'gender_male'
    ]
    
    # Convert boolean to int
    df['family_history'] = df['family_history'].astype(int)
    df['smoking'] = df['smoking'].astype(int)
    
    # Reorder columns to match model training order
    df = df[required_features]
    
    return df

def calculate_risk_factors(form_data, feature_importance):
    """
    Calculate top risk factors based on user data and feature importance
    """
    risk_factors = []
    
    # Define risk thresholds
    if form_data['glucose'] > 140:
        risk_factors.append('High glucose levels')
    if form_data['bmi'] > 30:
        risk_factors.append('High BMI (obesity)')
    if form_data['hba1c'] > 6.5:
        risk_factors.append('Elevated HbA1c')
    if form_data['systolic_bp'] > 140:
        risk_factors.append('High blood pressure')
    if form_data['family_history']:
        risk_factors.append('Family history of diabetes')
    if form_data['smoking']:
        risk_factors.append('Smoking')
    if form_data['activity_level'] < 3:
        risk_factors.append('Low physical activity')
    
    return risk_factors[:5]  # Return top 5 factors

def generate_recommendations(risk_factors, risk_level):
    """
    Generate personalized recommendations based on risk factors
    """
    recommendations = []
    
    if 'High glucose levels' in risk_factors:
        recommendations.append('Monitor blood glucose regularly and consider dietary changes')
    if 'High BMI' in risk_factors:
        recommendations.append('Maintain a healthy weight through diet and exercise')
    if 'High blood pressure' in risk_factors:
        recommendations.append('Monitor blood pressure and reduce sodium intake')
    if 'Smoking' in risk_factors:
        recommendations.append('Quit smoking to reduce diabetes risk')
    if 'Low physical activity' in risk_factors:
        recommendations.append('Increase physical activity to at least 150 minutes per week')
    
    # Add general recommendations
    if risk_level == 'high':
        recommendations.append('Consult with a healthcare provider immediately')
    elif risk_level == 'medium':
        recommendations.append('Schedule regular check-ups with your doctor')
    
    recommendations.append('Maintain a balanced diet rich in fiber and low in processed foods')
    
    return recommendations
```

### Model Utilities (utils/model_utils.py)
```python
import joblib
import numpy as np
from utils.data_preprocessing import calculate_risk_factors, generate_recommendations

def load_model(model_path):
    """
    Load trained ML model
    """
    try:
        model = joblib.load(model_path)
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def make_prediction(model, processed_data):
    """
    Make prediction using loaded model
    """
    try:
        # Get probability prediction
        probability = model.predict_proba(processed_data)[0]
        risk_score = probability[1]  # Probability of diabetes
        
        # Determine risk level
        if risk_score < 0.3:
            risk_level = 'low'
            timeline = 'Low risk - continue healthy lifestyle'
        elif risk_score < 0.7:
            risk_level = 'medium'
            timeline = 'Moderate risk - monitor closely and take preventive measures'
        else:
            risk_level = 'high'
            timeline = 'High risk - consult healthcare provider immediately'
        
        # Calculate confidence (based on how far from decision boundary)
        confidence = abs(risk_score - 0.5) * 2
        
        # Get feature importance if available
        feature_importance = getattr(model, 'feature_importances_', None)
        
        # Calculate top risk factors
        form_data = processed_data.iloc[0].to_dict()
        top_factors = calculate_risk_factors(form_data, feature_importance)
        
        # Generate recommendations
        recommendations = generate_recommendations(top_factors, risk_level)
        
        return {
            'risk_score': risk_score,
            'risk_level': risk_level,
            'confidence': confidence,
            'timeline': timeline,
            'top_factors': top_factors,
            'recommendations': recommendations
        }
        
    except Exception as e:
        raise Exception(f"Prediction error: {e}")
```

## ML Model Integration

### Model Requirements
Your ML model (`.pkl` file) must:
1. Be trained using scikit-learn
2. Have a `predict_proba()` method
3. Accept features in this exact order:
   ```python
   ['age', 'bmi', 'glucose', 'hba1c', 'systolic_bp', 'diastolic_bp',
    'cholesterol', 'triglycerides', 'activity_level', 'family_history',
    'smoking', 'gender_male']
   ```

### Model Preparation Example
```python
# Example of preparing and saving your model
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Assuming you have your data in DataFrame 'df'
# with target variable 'diabetes' (0 or 1)

# Prepare features
features = ['age', 'bmi', 'glucose', 'hba1c', 'systolic_bp', 'diastolic_bp',
           'cholesterol', 'triglycerides', 'activity_level', 'family_history',
           'smoking', 'gender_male']

X = df[features]
y = df['diabetes']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'backend/models/diabetes_model.pkl')
```

## API Endpoints

### POST /api/predict
**Description**: Get comprehensive diabetes risk prediction based on health metrics, lifestyle, and optional advanced data

**Request Body**:
```json
{
  "age": 45,
  "gender": "male",
  "bmi": 28.5,
  "systolic_bp": 125,
  "diastolic_bp": 82,
  "num_conditions": 2,
  "num_visits": 4,
  "hba1c": 5.8,
  "glucose": 98,
  "triglycerides": 150,
  "hdl_cholesterol": 45,
  "ldl_cholesterol": 120,
  "daily_steps": 6500,
  "sleep_duration": 6.5,
  "stress_level": 7,
  "heart_rate": 72,
  "o2_saturation": 97,
  "family_history": true,
  "smoking": false,
  "activity_level": 3
}
```

**Response**:
```json
{
  "risk_score": 0.32,
  "risk_level": "medium",
  "confidence": 0.92,
  "timeline": [
    { "years": 1, "risk": 0.32 },
    { "years": 3, "risk": 0.45 },
    { "years": 5, "risk": 0.55 },
    { "years": 10, "risk": 0.72 }
  ],
  "top_factors": [
    { "factor": "HbA1c", "impact": 0.30 },
    { "factor": "BMI", "impact": 0.25 },
    { "factor": "Blood Pressure", "impact": 0.18 },
    { "factor": "Physical Activity", "impact": 0.15 },
    { "factor": "Age", "impact": 0.12 }
  ],
  "recommendations": [
    "Consider a weight management program to achieve a healthier BMI.",
    "Aim for at least 7,000-10,000 steps per day for better health outcomes.",
    "Try to get 7-9 hours of sleep per night for optimal health.",
    "Consider stress-reduction techniques like meditation or yoga.",
    "Monitor your blood sugar levels regularly and consult with a healthcare provider."
  ],
  "timestamp": "2023-11-15T14:30:00Z"
}
```

### Risk Assessment Details

#### Risk Score Calculation
- **Score Range**: 0.0 - 1.0 (low to high risk)
- **Risk Levels**:
  - Low: 0.0 - 0.39
  - Medium: 0.4 - 0.69
  - High: 0.7 - 1.0

#### Top Factors Considered
1. **Metabolic Markers**: HbA1c, fasting glucose, insulin resistance (HOMA-IR)
2. **Anthropometrics**: BMI, waist circumference, body fat percentage
3. **Lipid Profile**: Cholesterol, triglycerides, HDL/LDL ratio
4. **Lifestyle Factors**: Physical activity, diet quality, sleep duration
5. **Inflammatory Markers**: hs-CRP, inflammatory cytokines
6. **Genetic Predisposition**: Family history, genetic risk score

#### Response Fields
- `risk_score`: Numeric value between 0 and 1 indicating overall risk
- `risk_level`: Categorized risk (low/medium/high)
- `confidence`: Model confidence in prediction (0-1)
- `timeline`: Projected risk over time
- `top_factors`: Most influential risk factors
- `recommendations`: Personalized health recommendations
- `timestamp`: When the prediction was generated

### GET /api/health
**Purpose**: Check backend health status
**Response**:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## Setup Instructions

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Backend Setup
1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Place your ML model:
   - Save your trained model as `backend/models/diabetes_model.pkl`

4. Start Flask server:
   ```bash
   python app.py
   ```

### Integration Steps
1. Update the API call in `src/pages/Demo.tsx`:
   ```typescript
   // Replace the mock prediction (lines 62-64) with:
   const response = await fetch('http://localhost:5000/api/predict', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   });
   
   if (!response.ok) {
     throw new Error('Prediction failed');
   }
   
   const result = await response.json();
   setResult(result);
   ```

2. Test the integration:
   - Start both frontend and backend servers
   - Navigate to `/demo`
   - Fill out the form and submit
   - Verify prediction results are displayed

## Troubleshooting

### Common Issues

1. **CORS Error**: Make sure Flask-CORS is installed and configured
2. **Model Loading Error**: Verify model path and scikit-learn version compatibility
3. **Feature Mismatch**: Ensure model expects the exact feature order specified
4. **Build Errors**: Check all dependencies are installed correctly

### Debug Tips
- Use browser dev tools to inspect network requests
- Check Flask console for error messages
- Verify model predictions manually in Python before integration
- Test API endpoints using tools like Postman or curl

### Performance Optimization
- Model loading: Load model once on startup, not per request
- Caching: Consider caching predictions for identical inputs
- Error handling: Implement comprehensive error handling and logging

This documentation provides a complete guide to understanding and extending the diabetes risk assessment platform. The codebase is designed to be modular, maintainable, and easily extensible for additional features.