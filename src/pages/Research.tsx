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
            Comprehensive analysis of the BRFSS Dataset for ML-based Type 2 Diabetes 
            progression prediction, including Dataset overview, Methodology, and 
            Performance metrics.
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
                    Type 2 Diabetes Mellitus (T2DM) is a significant global health concern affecting over
                    400 million individuals. Predicting disease progression is critical for managing
                    complications and improving patient outcomes.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    This study leverages the Behavioral Risk Factor Surveillance System (BRFSS) dataset,
                    a large-scale, nationally representative dataset with over 200,000 responses and
                    30+ multivariate health indicators, including self-reported clinical, lifestyle, laboratory,
                    and demographic variables relevant to diabetes progression.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Our objective is to develop a reliable machine learning model using Threshold-Optimized
                    LightGBM with advanced feature engineering to predict Type 2 Diabetes progression
                    across diverse populations, supporting personalized interventions and public health strategies.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Model performance achieves 85.42% test accuracy, with detailed validation metrics
                    provided in the performance evaluation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-primary-light/20 rounded-lg">
                    <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">85.42%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-success-light/20 rounded-lg">
                    <Users className="h-8 w-8 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">200,000+</div>
                    <div className="text-sm text-muted-foreground">Individuals</div>
                  </div>
                  <div className="text-center p-4 bg-warning-light/20 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-warning mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">30+</div>
                    <div className="text-sm text-muted-foreground">Multivariate health indicators</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dataset" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Dataset Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Dataset Statistics */}
                  <div>
                    <h3 className="font-semibold mb-3">Dataset Statistics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Samples:</span>
                        <span className="font-medium">200,000+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Points:</span>
                        <span className="font-medium">30+ health indicators</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Features Used for Prediction:</span>
                        <span className="font-medium">75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Types:</span>
                        <span className="font-medium">Clinical, Laboratory, Lifestyle, Demographic</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Missing Values:</span>
                        <span className="font-medium">Handled with preprocessing</span>
                      </div>
                    </div>
                  </div>
                  {/* Feature Categories */}
                  <div>
                    <h3 className="font-semibold mb-3">Feature Categories</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <span className="text-muted-foreground w-56">Demographic</span>
                        <Progress value={30} className="h-2 flex-1 mx-2" />
                        <span className="font-medium w-20 text-right">4 features</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground w-56">Clinical</span>
                        <Progress value={80} className="h-2 flex-1 mx-2" />
                        <span className="font-medium w-20 text-right">8 features</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground w-56">Lifestyle & Behavioral Stats</span>
                        <Progress value={25} className="h-2 flex-1 mx-2" />
                        <span className="font-medium w-20 text-right">3 features</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground w-56">Mental & Physical Health Stats</span>
                        <Progress value={25} className="h-2 flex-1 mx-2" />
                        <span className="font-medium w-20 text-right">3 features</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Feature Descriptions */}
                <div>
                  <h3 className="font-semibold mb-3">Feature Descriptions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <Badge variant="outline" className="mb-2">Demographic Information</Badge>
                      <ul className="space-y-1 text-muted-foreground">
                        <li><span className="font-medium">Age</span> – Participant’s age</li>
                        <li><span className="font-medium">Sex</span> – Biological sex (Male/Female/Other)</li>
                        <li><span className="font-medium">Education</span> – Highest level of education attained</li>
                        <li><span className="font-medium">Income</span> – Income level (actual or categorical)</li>
                      </ul>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Lifestyle & Behavioral Stats</Badge>
                      <ul className="space-y-1 text-muted-foreground">
                        <li><span className="font-medium">Smoked 100 Cigarettes in Life</span> – Ever smoked at least 100 cigarettes (Yes/No)</li>
                        <li><span className="font-medium">Heavy Alcohol Consumption</span> – Engages in heavy drinking</li>
                        <li><span className="font-medium">Physical Activity (last 30 days)</span> – Participated in any physical activity recently (Yes/No)</li>
                      </ul>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Clinical Data</Badge>
                      <ul className="space-y-1 text-muted-foreground">
                        <li><span className="font-medium">BMI</span> – Body Mass Index</li>
                        <li><span className="font-medium">High Blood Pressure</span> – Diagnosed with hypertension (Yes/No)</li>
                        <li><span className="font-medium">High Cholesterol</span> – Diagnosed with high cholesterol (Yes/No)</li>
                        <li><span className="font-medium">Cholesterol Check (past 5 years)</span> – Had a cholesterol check within the past 5 years (Yes/No)</li>
                        <li><span className="font-medium">General Health Rating</span> – Self-assessment of general health</li>
                        <li><span className="font-medium">Difficulty Walking</span> – Trouble walking or climbing stairs (Yes/No)</li>
                        <li><span className="font-medium">Couldn’t See Doctor Due to Cost</span> – Skipped care due to cost (Yes/No)</li>
                        <li><span className="font-medium">Has Any Form of Healthcare</span> – Has insurance or coverage (Yes/No)</li>
                      </ul>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">Mental & Physical Health Stats</Badge>
                      <ul className="space-y-1 text-muted-foreground">
                        <li><span className="font-medium">Days of Poor Mental Health (last 30)</span> – Number of days mental health was not good</li>
                        <li><span className="font-medium">Days of Poor Physical Health (last 30)</span> – Number of days physical health was not good</li>
                        <li><span className="font-medium">History of Stroke</span> – Ever had a stroke (Yes/No)</li>
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
                        Encoded null values (e.g., 77, 99) replaced with NaN
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Duplicate and constant columns removed
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Outliers reviewed and retained due to medical relevance
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Feature scaling using StandardScaler
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Categorical encoding using one-hot encoding
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Label mapping (Target_Label) for readability and visualizations
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Feature Engineering</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Logical interaction features (e.g., BMI × Physical Activity)
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Age banding applied using binning
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Feature importance analyzed via Random Forest and Mutual Information
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Polynomial features (degree 2) and SelectKBest (ANOVA) for feature selection
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Model Architecture</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Our modeling pipeline explored multiple learners and ensemble methods, with a Threshold-Optimized LightGBM model achieving optimal performance:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-card rounded-lg">
                        <div className="font-medium text-foreground">LightGBM</div>
                        <div className="text-sm text-muted-foreground">Primary Model</div>
                        
                      </div>
                      <div className="text-center p-3 bg-card rounded-lg">
                        <div className="font-medium text-foreground">XGBoost</div>
                        <div className="text-sm text-muted-foreground">Baseline Model</div>
                        
                      </div>
                      <div className="text-center p-3 bg-card rounded-lg">
                        <div className="font-medium text-foreground">Random Forest</div>
                        <div className="text-sm text-muted-foreground">Baseline Model</div>
                        
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
                        <div className="text-sm text-muted-foreground">80-20 or 88-12 stratified train-test split</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">2</div>
                      <div>
                        <div className="font-medium">Cross-Validation</div>
                        <div className="text-sm text-muted-foreground">5-fold stratified cross-validation for robust performance estimation</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">3</div>
                      <div>
                        <div className="font-medium">Feature Selection & Tuning</div>
                        <div className="text-sm text-muted-foreground">Polynomial feature expansion and GridSearchCV with SelectKBest (ANOVA)</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">4</div>
                      <div>
                        <div className="font-medium">Resampling & Class Balancing</div>
                        <div className="text-sm text-muted-foreground">SMOTE, SMOTEENN, BorderlineSMOTE for balanced binary dataset</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">5</div>
                      <div>
                        <div className="font-medium">Ensemble & Threshold Optimization</div>
                        <div className="text-sm text-muted-foreground">Voting/stacking ensembles with threshold tuning for diabetic class recall</div>
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
                    <div className="text-2xl font-bold text-foreground">85.37%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-success-light/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">81.24%</div>
                    <div className="text-sm text-muted-foreground">AUC-ROC</div>
                  </div>
                  <div className="text-center p-4 bg-warning-light/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">18.47%</div>
                    <div className="text-sm text-muted-foreground">Sensitivity</div>
                  </div>
                  <div className="text-center p-4 bg-danger-light/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">97.45%</div>
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
                          <span className="text-sm font-medium">56.71%</span>
                        </div>
                        <Progress value={56.71} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Recall</span>
                          <span className="text-sm font-medium">18.47%</span>
                        </div>
                        <Progress value={18.47} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">F1-Score</span>
                          <span className="text-sm font-medium">27.87%</span>
                        </div>
                        <Progress value={27.87} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Model Comparison</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>LightGBM</span>
                        <span className="font-medium text-success">85.42%</span>
                      </div>
                      
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>XGBoost</span>
                        <span className="font-medium text-success">84.95%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Random Forest</span>
                        <span className="font-medium text-success">76.06%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Neural Network</span>
                        <span className="font-medium text-success">73.05%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Logistic Regression</span>
                        <span className="font-medium text-success">69.80%</span>
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
                        <Progress value={80} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">80%</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">Glucose</div>
                      <div className="flex-1">
                        <Progress value={75} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">75%</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">BMI</div>
                      <div className="flex-1">
                        <Progress value={70} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">70%</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">Age</div>
                      <div className="flex-1">
                        <Progress value={65} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">65%</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 text-sm text-muted-foreground">Family History</div>
                      <div className="flex-1">
                        <Progress value={60} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium text-right">60%</div>
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