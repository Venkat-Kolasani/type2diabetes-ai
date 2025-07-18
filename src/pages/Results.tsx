import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ROCCurve } from "@/components/charts/ROCCurve";
import { FeatureImportance } from "@/components/charts/FeatureImportance";
import { ConfusionMatrix } from "@/components/charts/ConfusionMatrix";
import { ModelComparison } from "@/components/charts/ModelComparison";
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Activity,
  Award,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function Results() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Model Performance Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive evaluation of our Type 2 Diabetes prediction model, 
            including accuracy metrics, visualizations, and comparative analysis
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-foreground">94.2%</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+2.1%</span>
                  </div>
                </div>
                <div className="bg-gradient-primary p-3 rounded-full">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">AUC-ROC</p>
                  <p className="text-2xl font-bold text-foreground">0.96</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+0.04</span>
                  </div>
                </div>
                <div className="bg-gradient-health p-3 rounded-full">
                  <TrendingUp className="h-8 w-8 text-success-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Precision</p>
                  <p className="text-2xl font-bold text-foreground">91.5%</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+1.8%</span>
                  </div>
                </div>
                <div className="bg-gradient-warning p-3 rounded-full">
                  <Activity className="h-8 w-8 text-warning-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">F1-Score</p>
                  <p className="text-2xl font-bold text-foreground">92.1%</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+1.9%</span>
                  </div>
                </div>
                <div className="bg-gradient-danger p-3 rounded-full">
                  <Award className="h-8 w-8 text-danger-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* ROC Curve */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>ROC Curve Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ROCCurve />
            </CardContent>
          </Card>

          {/* Feature Importance */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Feature Importance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FeatureImportance />
            </CardContent>
          </Card>

          {/* Confusion Matrix */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Confusion Matrix</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ConfusionMatrix />
            </CardContent>
          </Card>

          {/* Model Comparison */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Model Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ModelComparison />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Classification Report */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Classification Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                  <div>Class</div>
                  <div>Precision</div>
                  <div>Recall</div>
                  <div>F1-Score</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-4 p-3 bg-muted/30 rounded">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">Low Risk</Badge>
                    </div>
                    <div className="font-medium">93.2%</div>
                    <div className="font-medium">94.5%</div>
                    <div className="font-medium">93.8%</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-3 bg-muted/30 rounded">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">High Risk</Badge>
                    </div>
                    <div className="font-medium">89.8%</div>
                    <div className="font-medium">88.1%</div>
                    <div className="font-medium">88.9%</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-3 bg-primary/10 rounded font-medium">
                  <div>Weighted Avg</div>
                  <div>91.5%</div>
                  <div>92.8%</div>
                  <div>92.1%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Improvements */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Performance Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium">Ensemble Method</div>
                    <div className="text-sm text-muted-foreground">
                      Improved accuracy by 2.1% over single models
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium">Feature Engineering</div>
                    <div className="text-sm text-muted-foreground">
                      Enhanced prediction with interaction terms
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium">Hyperparameter Tuning</div>
                    <div className="text-sm text-muted-foreground">
                      Optimized model parameters for better performance
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium">Cross-Validation</div>
                    <div className="text-sm text-muted-foreground">
                      Robust evaluation with 5-fold CV
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}