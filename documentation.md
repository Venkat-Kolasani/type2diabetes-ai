# BRFSS Diabetes Risk Assessment Platform - Complete Documentation

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

This is a comprehensive diabetes risk assessment platform built with React, TypeScript, and Tailwind CSS on the frontend, designed to integrate with a Flask backend and machine learning model trained on the BRFSS (Behavioral Risk Factor Surveillance System) dataset for real-time predictions.

### Key Features
- Interactive form for BRFSS health data collection
- Real-time diabetes risk assessment using ML model
- Three-class diabetes status prediction (0: no-diabetes, 1: pre-diabetic, 2: diabetic)
- Visual risk representation with charts
- Responsive design with dark/light theme support
- Comprehensive results with personalized recommendations

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Backend**: Flask (Python)
- **ML**: Scikit-learn, Pandas, NumPy
- **Dataset**: BRFSS (Behavioral Risk Factor Surveillance System)

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
**Purpose**: Collects BRFSS health data for diabetes risk assessment
**Key Features**:
- Form validation using React Hook Form
- Organized sections: Demographics, Clinical Data, Lifestyle & Behavioral Stats, Mental & Physical Health Stats
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
// 1. Demographics: Age (slider), Sex (radio), Education (select), Income (select)
// 2. Clinical Data: BMI, High Blood Pressure, High Cholesterol, etc.
// 3. Lifestyle & Behavioral: Smoking, Alcohol, Physical Activity, Diet
// 4. Mental & Physical Health: Mental health days, Physical health days, Medical history
```

#### ResultsPanel.tsx
**Purpose**: Displays prediction results and recommendations
**Key Features**:
- Diabetes status display (No Diabetes, Pre-Diabetic, Diabetic)
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

// Diabetes status: 0 (No Diabetes), 1 (Pre-Diabetic), 2 (Diabetic)
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
**Purpose**: Main diabetes risk assessment interface using BRFSS data
**Key Features**:
- Form management with React Hook Form
- State management for loading, results, and errors
- API integration (currently mocked)
- Result display and form reset functionality

```typescript
export type FormData = {
  // Demographic
  age: number;
  sex: 'male' | 'female' | 'other';
  education: string;
  income: string;
  
  // Clinical Data
  bmi: number;
  high_blood_pressure: 'yes' | 'no';
  high_cholesterol: 'yes' | 'no';
  cholesterol_check: 'yes' | 'no';
  general_health: 'excellent' | 'very_good' | 'good' | 'fair' | 'poor';
  difficulty_walking: 'yes' | 'no';
  couldnt_see_doctor: 'yes' | 'no';
  has_healthcare: 'yes' | 'no';
  
  // Lifestyle and Behavioral Stats
  smoked_100_cigarettes: 'yes' | 'no';
  heavy_alcohol: 'yes' | 'no';
  physical_activity: 'yes' | 'no';
  fruit_consumption: number;
  vegetable_consumption: number;
  
  // Mental and Physical Health Stats
  poor_mental_health: number;
  poor_physical_health: number;
  history_stroke: 'yes' | 'no';
  history_heart_disease: 'yes' | 'no';
};

export type PredictionResult = {
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high';
  diabetes_status: number; // 0: no-diabetes, 1: pre-diabetic, 2: diabetic
  confidence: number;
  timeline: Array<{ years: number; risk: number }>;
  top_factors: Array<{ factor: string; impact: number }>;
  recommendations: string[];
  timestamp: string;
};
```

### Landing.tsx
**Purpose**: Landing page for new users
**Content**: Hero section, features overview, call-to-action

### Research.tsx
**Purpose**: Research methodology and findings
**Content**: ML model information, BRFSS data sources, validation results

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
1. User fills BRFSS form in `InputForm.tsx`
2. Form data validated using React Hook Form
3. On submit, `Demo.tsx` calls mock prediction function
4. Results displayed in `ResultsPanel.tsx` and `RiskVisualization.tsx`

### Planned Flow (With Backend)
1. User fills BRFSS form → Frontend validation
2. Form data sent to Flask backend via POST `/api/predict`
3. Backend preprocesses BRFSS data and runs ML model
4. Prediction results returned to frontend with diabetes status
5. Results displayed with visualizations

## Flask Backend Implementation

### Backend Structure
```
backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── models/
│   └── brfss_diabetes_model.pkl  # Trained ML model
├── utils/
│   ├── __init__.py
│   ├── data_preprocessing.py  # BRFSS data preprocessing functions
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
model = load_model('models/brfss_diabetes_model.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get BRFSS form data
        data = request.get_json()
        
        # Preprocess data
        processed_data = preprocess_data(data)
        
        # Make prediction
        prediction = make_prediction(model, processed_data)
        
        # Return structured response
        return jsonify({
            'risk_score': float(prediction['risk_score']),
            'risk_level': prediction['risk_level'],
            'diabetes_status': prediction['diabetes_status'],
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
    return jsonify({'status': 'healthy', 'model_loaded': model is not None, 'dataset': 'BRFSS'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

### Data Preprocessing (utils/data_preprocessing.py)
```python
import pandas as pd
import numpy as np

def preprocess_data(form_data):
    """
    Preprocess BRFSS form data for ML model prediction
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
    
    # Ensure all required features are present
    required_features = [
        'age', 'sex', 'education', 'income', 'bmi', 'high_blood_pressure',
        'high_cholesterol', 'cholesterol_check', 'general_health',
        'difficulty_walking', 'couldnt_see_doctor', 'has_healthcare',
        'smoked_100_cigarettes', 'heavy_alcohol', 'physical_activity',
        'fruit_consumption', 'vegetable_consumption', 'poor_mental_health',
        'poor_physical_health', 'history_stroke', 'history_heart_disease'
    ]
    
    # Reorder columns to match model training order
    df = df[required_features]
    
    return df

def calculate_risk_factors(form_data, feature_importance):
    """
    Calculate top risk factors based on BRFSS user data and feature importance
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
    
    return risk_factors[:5]  # Return top 5 factors

def generate_recommendations(risk_factors, risk_level, diabetes_status):
    """
    Generate personalized recommendations based on BRFSS risk factors
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
    
    # Add general recommendations
    recommendations.extend([
        'Maintain a balanced diet rich in fiber and low in processed foods',
        'Stay hydrated and get adequate sleep',
        'Manage stress through relaxation techniques or meditation',
        'Build a support network for health goals'
    ])
    
    return list(dict.fromkeys(recommendations))[:8]  # Remove duplicates and return top 8
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
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(processed_data)
            
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
            prediction = model.predict(processed_data)
            diabetes_status = int(prediction[0])
            risk_score = float(prediction[0]) / 2.0  # Normalize to 0-1
        
        # Determine risk level
        if diabetes_status == 2:  # Diabetic
            risk_level = 'high'
        elif diabetes_status == 1:  # Pre-diabetic
            risk_level = 'medium'
        else:  # No diabetes
            if risk_score < 0.3:
                risk_level = 'low'
            elif risk_score < 0.6:
                risk_level = 'medium'
            else:
                risk_level = 'high'
        
        # Calculate confidence (based on how far from decision boundary)
        confidence = abs(risk_score - 0.5) * 2
        
        # Generate timeline based on diabetes status
        if diabetes_status == 2:  # Diabetic
            timeline = [
                {'years': 1, 'risk': 0.85},
                {'years': 3, 'risk': 0.90},
                {'years': 5, 'risk': 0.95},
                {'years': 10, 'risk': 0.98}
            ]
        elif diabetes_status == 1:  # Pre-diabetic
            timeline = [
                {'years': 1, 'risk': 0.60},
                {'years': 3, 'risk': 0.75},
                {'years': 5, 'risk': 0.85},
                {'years': 10, 'risk': 0.92}
            ]
        else:  # No diabetes
            base_risk = 0.2 if risk_level == 'medium' else 0.1
            timeline = [
                {'years': 1, 'risk': base_risk},
                {'years': 3, 'risk': base_risk * 1.2},
                {'years': 5, 'risk': base_risk * 1.5},
                {'years': 10, 'risk': base_risk * 2.0}
            ]
        
        # Get feature importance if available
        feature_importance = getattr(model, 'feature_importances_', None)
        
        # Calculate top risk factors
        form_data = processed_data.iloc[0].to_dict()
        top_factors = calculate_risk_factors(form_data, feature_importance)
        
        # Generate recommendations
        recommendations = generate_recommendations(top_factors, risk_level, diabetes_status)
        
        return {
            'risk_score': risk_score,
            'risk_level': risk_level,
            'diabetes_status': diabetes_status,
            'confidence': confidence,
            'timeline': timeline,
            'top_factors': [{'factor': factor, 'impact': 0.2} for factor in top_factors],
            'recommendations': recommendations
        }
        
    except Exception as e:
        raise Exception(f"Prediction error: {e}")
```

## ML Model Integration

### Model Requirements
Your ML model (`.pkl` file) must:
1. Be trained using scikit-learn on BRFSS dataset
2. Have a `predict_proba()` method for multi-class classification
3. Accept features in this exact order:
   ```python
   ['age', 'sex', 'education', 'income', 'bmi', 'high_blood_pressure',
    'high_cholesterol', 'cholesterol_check', 'general_health',
    'difficulty_walking', 'couldnt_see_doctor', 'has_healthcare',
    'smoked_100_cigarettes', 'heavy_alcohol', 'physical_activity',
    'fruit_consumption', 'vegetable_consumption', 'poor_mental_health',
    'poor_physical_health', 'history_stroke', 'history_heart_disease']
   ```
4. Output three classes: 0 (no-diabetes), 1 (pre-diabetic), 2 (diabetic)

### Model Preparation Example
```python
# Example of preparing and saving your BRFSS model
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Assuming you have your BRFSS data in DataFrame 'df'
# with target variable 'diabetes_status' (0, 1, or 2)

# Prepare features
features = ['age', 'sex', 'education', 'income', 'bmi', 'high_blood_pressure',
           'high_cholesterol', 'cholesterol_check', 'general_health',
           'difficulty_walking', 'couldnt_see_doctor', 'has_healthcare',
           'smoked_100_cigarettes', 'heavy_alcohol', 'physical_activity',
           'fruit_consumption', 'vegetable_consumption', 'poor_mental_health',
           'poor_physical_health', 'history_stroke', 'history_heart_disease']

X = df[features]
y = df['diabetes_status']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'backend/models/brfss_diabetes_model.pkl')
```

## API Endpoints

### POST /api/predict
**Description**: Get comprehensive diabetes risk prediction based on BRFSS health metrics

**Request Body**:
```json
{
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
```

**Response**:
```json
{
  "risk_score": 0.32,
  "risk_level": "medium",
  "diabetes_status": 1,
  "confidence": 0.92,
  "timeline": [
    { "years": 1, "risk": 0.60 },
    { "years": 3, "risk": 0.75 },
    { "years": 5, "risk": 0.85 },
    { "years": 10, "risk": 0.92 }
  ],
  "top_factors": [
    { "factor": "High BMI (obesity)", "impact": 0.2 },
    { "factor": "Age over 45", "impact": 0.2 },
    { "factor": "Low physical activity", "impact": 0.2 }
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
  "timestamp": "2023-11-15T14:30:00Z"
}
```

### Risk Assessment Details

#### Diabetes Status Classification
- **0: No Diabetes** - No signs of diabetes detected
- **1: Pre-Diabetic** - Early warning signs detected, monitor closely
- **2: Diabetic** - Diabetes indicators present, consult healthcare provider

#### Risk Score Calculation
- **Score Range**: 0.0 - 1.0 (low to high risk)
- **Risk Levels**:
  - Low: 0.0 - 0.39
  - Medium: 0.4 - 0.69
  - High: 0.7 - 1.0

#### Top Factors Considered
1. **Demographics**: Age, sex, education, income
2. **Clinical Markers**: BMI, blood pressure, cholesterol
3. **Lifestyle Factors**: Smoking, alcohol, physical activity, diet
4. **Health Status**: General health, mental/physical health days
5. **Medical History**: Stroke, heart disease
6. **Healthcare Access**: Insurance coverage, ability to see doctor

#### Response Fields
- `risk_score`: Numeric value between 0 and 1 indicating overall risk
- `risk_level`: Categorized risk (low/medium/high)
- `diabetes_status`: Diabetes classification (0/1/2)
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
  "model_loaded": true,
  "dataset": "BRFSS"
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
   - Save your trained BRFSS model as `backend/models/brfss_diabetes_model.pkl`

4. Start Flask server:
   ```bash
   python app.py
   ```

### Integration Steps
1. Update the API call in `src/pages/Demo.tsx`:
   ```typescript
   // Replace the mock prediction with:
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
   - Fill out the BRFSS form and submit
   - Verify prediction results are displayed with diabetes status

## Troubleshooting

### Common Issues

1. **CORS Error**: Make sure Flask-CORS is installed and configured
2. **Model Loading Error**: Verify model path and scikit-learn version compatibility
3. **Feature Mismatch**: Ensure model expects the exact BRFSS feature order specified
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

This documentation provides a complete guide to understanding and extending the BRFSS-based diabetes risk assessment platform. The codebase is designed to be modular, maintainable, and easily extensible for additional features.