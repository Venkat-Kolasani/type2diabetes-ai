import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Brain, 
  BarChart3, 
  Shield, 
  Users, 
  Clock, 
  Target,
  ChevronRight,
  Zap,
  Award,
  TrendingUp,
  CheckCircle
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light/20 via-background to-success-light/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              <Activity className="h-4 w-4 mr-2" />
              AI-Powered Health Prediction
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Predict Type 2 Diabetes Progression{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Using AI on Multivariate Health Indicators
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our model utilizes the Behavioral Risk Factor Surveillance System (BRFSS) dataset, 
              analyzing a broad range of clinical, lifestyle, and demographic indicators 
              to provide insights into the progression of Type 2 Diabetes. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-medical">
                <Link to="/demo">
                  Try Demo Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/research">
                  View Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center shadow-card hover:shadow-elevation transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-primary p-3 rounded-full">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">85.4%</div>
                <div className="text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-elevation transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-health p-3 rounded-full">
                    <BarChart3 className="h-8 w-8 text-success-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">30+</div>
                <div className="text-muted-foreground">Curated Health Indicators</div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-elevation transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-warning p-3 rounded-full">
                    <Zap className="h-8 w-8 text-warning-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">Real-time</div>
                <div className="text-muted-foreground">Analysis</div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-elevation transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-danger p-3 rounded-full">
                    <Users className="h-8 w-8 text-danger-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">Personalized</div>
                <div className="text-muted-foreground">Results</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced Health Assessment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analysis using state of the art machine learning algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="shadow-card hover:shadow-elevation transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>AI-Powered Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Applies machine learning algorithms trained on the BRFSS dataset to assess 
                  Type 2 Diabetes risk based on real world, population level health indicators.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    LightGBM model optimized for class imbalance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Feature importance analysis for model transparency
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Trained on large-scale public health data from 200,000+ respondents
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="shadow-card hover:shadow-elevation transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-health p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-success-foreground" />
                  </div>
                  <CardTitle>Comprehensive Screening</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Analyzes a wide spectrum of clinical, behavioral, and demographic health indicators 
                  for an accurate, holistic risk assessment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                     Indicators include BMI, activity level, blood pressure status, and general health
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Covers lifestyle habits: smoking, alcohol, diet, and physical activity
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Considers age, income, education, and healthcare access disparities
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="shadow-card hover:shadow-elevation transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-warning p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-warning-foreground" />
                  </div>
                  <CardTitle>Personalized Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generates user-specific insights using explainable models to guide healthier decisions.
                  
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Highlights influential health indicators for each user
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Offers interpretable model outputs using SHAP and feature ranking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                     Supports proactive health engagement based on individual risk profiles
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Track and Predict Your Diabetes Progression?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards better health with our AI-powered diabetes risk assessment. 
            Fast, accurate, and completely confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/demo">
                Start Assessment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/demo">
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}