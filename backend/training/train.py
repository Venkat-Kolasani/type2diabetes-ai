#!/usr/bin/env python3
"""
SIMPLIFIED LIGHTGBM DIABETES PREDICTION MODEL
Trains only LightGBM with preprocessing pipeline
"""

import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings('ignore')

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.feature_selection import SelectKBest, f_classif
from imblearn.over_sampling import BorderlineSMOTE

import lightgbm as lgb
import pickle
from datetime import datetime

print("🎯 SIMPLIFIED LIGHTGBM MODEL TRAINING")
print("=" * 50)

# ============================================================================
# DATA PREPARATION
# ============================================================================

print("\n📊 Loading and preparing data...")
df = pd.read_csv('cleaned_diabetes_full_binary_scaled.csv')
X = df.drop('Diabetes_binary', axis=1)
y = df['Diabetes_binary']

# Stratified split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.12, random_state=42, stratify=y
)

print(f"Training set: {X_train.shape}")
print(f"Test set: {X_test.shape}")
print(f"Class distribution: {y.value_counts().to_dict()}")

# ============================================================================
# FEATURE ENGINEERING PIPELINE
# ============================================================================

print("\n🔧 Building Feature Engineering Pipeline...")

# 1. Create polynomial features
poly = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)
print(f"After polynomial features: {X_train_poly.shape[1]} features")

# 2. Select top features
selector = SelectKBest(score_func=f_classif, k=75)
X_train_selected = selector.fit_transform(X_train_poly, y_train)
X_test_selected = selector.transform(X_test_poly)
print(f"After feature selection: {X_train_selected.shape[1]} features")

# 3. Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_selected)
X_test_scaled = scaler.transform(X_test_selected)
print(f"After scaling: {X_train_scaled.shape}")

# ============================================================================
# RESAMPLING
# ============================================================================

print("\n⚖️ Applying BorderlineSMOTE...")
resampler = BorderlineSMOTE(random_state=42)
X_train_resampled, y_train_resampled = resampler.fit_resample(X_train_scaled, y_train)
print(f"Final resampled training set: {X_train_resampled.shape}")

# ============================================================================
# LIGHTGBM MODEL TRAINING
# ============================================================================

print("\n🤖 Training LightGBM Model...")

# Optimized LightGBM parameters
lgbm_model = lgb.LGBMClassifier(
    n_estimators=800,
    max_depth=7,
    learning_rate=0.08,
    subsample=0.85,
    colsample_bytree=0.85,
    reg_alpha=0.1,
    reg_lambda=1.2,
    random_state=42,
    verbose=-1,
    class_weight='balanced'
)

# Train the model
lgbm_model.fit(X_train_resampled, y_train_resampled)

# Make predictions
y_pred = lgbm_model.predict(X_test_scaled)
test_accuracy = accuracy_score(y_test, y_pred)

print(f"\n🎯 LightGBM Test Accuracy: {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")

# ============================================================================
# SAVE MODEL AND PREPROCESSING PIPELINE
# ============================================================================

print(f"\n� Saving Model and Preprocessing Pipeline...")

# Save the trained model
model_path = '../model/model.pkl'
with open(model_path, 'wb') as f:
    pickle.dump(lgbm_model, f)
print(f"✅ Model saved to {model_path}")

# Save the preprocessing pipeline
preprocessing_pipeline = {
    'poly_features': poly,
    'feature_selector': selector,
    'scaler': scaler,
    'feature_names': X.columns.tolist()
}

pipeline_path = '../model/preprocessing_pipeline.pkl'
with open(pipeline_path, 'wb') as f:
    pickle.dump(preprocessing_pipeline, f)
print(f"✅ Preprocessing pipeline saved to {pipeline_path}")

# ============================================================================
# FINAL RESULTS
# ============================================================================

print(f"\n🎉 TRAINING COMPLETE!")
print(f"🎯 Final Model: LightGBM")
print(f"🎯 Final Test Accuracy: {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")
print(f"📁 Model file: {model_path}")
print(f"📁 Pipeline file: {pipeline_path}")

print(f"\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

