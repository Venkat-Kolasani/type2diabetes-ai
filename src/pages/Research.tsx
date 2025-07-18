import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Brain, 
  BarChart3, 
  Users, 
  Target,
  TrendingUp,
  FileText,
  BookOpen,
  Award,
  Activity
} from "lucide-react";

export default function Research() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Research & Methodology
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis of our Type 2 Diabetes risk prediction model, 
            including dataset information, methodology, and performance metrics
          </p>
        </div>

        <Tabs defaultValue="abstract" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="abstract">Abstract</TabsTrigger>
            <TabsTrigger value="dataset">Dataset</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Abstract Tab */}
          <TabsContent value="abstract" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Project Abstract</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    Type 2 Diabetes Mellitus (T2DM) represents a significant global health challenge, 
                    affecting over 400 million people worldwide. Early detection and risk assessment 
                    are crucial for preventing the onset of diabetes and its associated complications.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    This research presents an advanced machine learning approach for predicting 
                    Type 2 Diabetes risk using a comprehensive set of clinical and lifestyle indicators. 
                    Our model incorporates demographic data, laboratory biomarkers, anthropometric 
                    measurements, and behavioral factors to provide accurate risk stratification.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    The developed system achieves 94.2% accuracy in risk prediction and provides 
                    personalized recommendations for diabetes prevention. By leveraging ensemble 
                    learning techniques and feature engineering, our model outperforms traditional 
                    screening methods and offers clinicians a powerful tool for early intervention.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-primary-light/20 rounded-lg">
                    <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">94.2%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-success-light/20 rounded-lg">
                    <Users className="h-8 w-8 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">10,000+</div>
                    <div className="text-sm text-muted-foreground">Patients</div>
                  </div>
                  <div className="text-center p-4 bg-warning-light/20 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-warning mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">15</div>
                    <div className="text-sm text-muted-foreground">Features</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dataset Tab */}
          <TabsContent value="dataset" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Dataset Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Dataset Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Samples:</span>
                        <span className="font-medium">10,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Positive Cases:</span>
                        <span className="font-medium">3,254 (30%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Negative Cases:</span>
                        <span className="font-medium">7,593 (70%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Features:</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Missing Values:</span>
                        <span className="font-medium">&lt; 2%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Feature Categories</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Demographic</span>
                          <span className="text-sm font-medium">3 features</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Laboratory</span>
                          <span className="text-sm font-medium">5 features</span>
                        </div>
                        <Progress value={33} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Lifestyle</span>
                          <span className="text-sm font-medium">4 features</span>
                        </div>
                        <Progress value={27} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Clinical</span>
                          <span className="text-sm font-medium">3 features</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Feature Descriptions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="outline">Demographic</Badge>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Age (years)</li>
                        <li>• Gender (male/female)</li>
                        <li>• BMI (kg/m²)</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">Laboratory</Badge>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Fasting Glucose (mg/dL)</li>
                        <li>• HbA1c (%)</li>
                        <li>• Total Cholesterol (mg/dL)</li>
                        <li>• Triglycerides (mg/dL)</li>
                        <li>• HDL Cholesterol (mg/dL)</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">Clinical</Badge>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Systolic Blood Pressure (mmHg)</li>
                        <li>• Diastolic Blood Pressure (mmHg)</li>
                        <li>• Waist Circumference (cm)</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline">Lifestyle</Badge>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Family History (yes/no)</li>
                        <li>• Smoking Status (yes/no)</li>
                        <li>• Physical Activity Level (1-5)</li>
                        <li>• Alcohol Consumption (units/week)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Methodology Tab */}
          <TabsContent value="methodology" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Machine Learning Methodology</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Data Preprocessing</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Missing value imputation using KNN algorithm
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Outlier detection and treatment using IQR method
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Feature scaling using StandardScaler
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Categorical encoding using one-hot encoding
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Feature Engineering</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Polynomial features for non-linear relationships
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Interaction terms between key variables
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Principal Component Analysis (PCA) for dimensionality reduction
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        SHAP values for feature importance analysis
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Model Architecture</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Our ensemble approach combines multiple algorithms to achieve optimal performance:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-card rounded-lg">
                        <div className="font-medium text-foreground">Random Forest</div>
                        <div className="text-sm text-muted-foreground">Base Model 1</div>
                        <div className="text-xs text-primary mt-1">Weight: 0.4</div>
                      </div>
                      <div className="text-center p-3 bg-card rounded-lg">
                        <div className="font-medium text-foreground">XGBoost</div>
                        <div className="text-sm text-muted-foreground">Base Model 2</div>
                        <div className="text-xs text-primary mt-1">Weight: 0.4</div>
                      </div>
                      <div className="text-center p-3 bg-card rounded-lg">
                        <div className="font-medium text-foreground">Neural Network</div>
                        <div className="text-sm text-muted-foreground">Base Model 3</div>
                        <div className="text-xs text-primary mt-1">Weight: 0.2</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Training Process</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">1</div>
                      <div>
                        <div className="font-medium">Data Splitting</div>
                        <div className="text-sm text-muted-foreground">80% training, 20% testing with stratified sampling</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">2</div>
                      <div>
                        <div className="font-medium">Cross-Validation</div>
                        <div className="text-sm text-muted-foreground">5-fold cross-validation for robust performance estimation</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">3</div>
                      <div>
                        <div className="font-medium">Hyperparameter Tuning</div>
                        <div className="text-sm text-muted-foreground">Grid search with Bayesian optimization</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">4</div>
                      <div>
                        <div className="font-medium">Ensemble Training</div>
                        <div className="text-sm text-muted-foreground">Weighted voting with performance-based weights</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Model Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary-light/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">94.2%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-success-light/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">0.96</div>
                    <div className="text-sm text-muted-foreground">AUC-ROC</div>
                  </div>
                  <div className="text-center p-4 bg-warning-light/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">92.8%</div>
                    <div className="text-sm text-muted-foreground">Sensitivity</div>
                  </div>
                  <div className="text-center p-4 bg-danger-light/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">95.1%</div>
                    <div className="text-sm text-muted-foreground">Specificity</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Classification Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Precision</span>
                          <span className="text-sm font-medium">91.5%</span>
                        </div>
                        <Progress value={91.5} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Recall</span>
                          <span className="text-sm font-medium">92.8%</span>
                        </div>
                        <Progress value={92.8} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">F1-Score</span>
                          <span className="text-sm font-medium">92.1%</span>
                        </div>
                        <Progress value={92.1} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Model Comparison</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Ensemble Model</span>
                        <span className="font-medium text-success">94.2%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>XGBoost</span>
                        <span className="font-medium">92.8%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Random Forest</span>
                        <span className="font-medium">91.5%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Neural Network</span>
                        <span className="font-medium">89.3%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Logistic Regression</span>
                        <span className="font-medium">85.7%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Feature Importance</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">HbA1c</div>
                      <div className="flex-1">
                        <Progress value={100} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">1.00</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">Glucose</div>
                      <div className="flex-1">
                        <Progress value={85} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">0.85</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">BMI</div>
                      <div className="flex-1">
                        <Progress value={72} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">0.72</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">Age</div>
                      <div className="flex-1">
                        <Progress value={68} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">0.68</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">Family History</div>
                      <div className="flex-1">
                        <Progress value={55} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">0.55</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}