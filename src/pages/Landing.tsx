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
              Predict Type 2 Diabetes Risk with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI-Powered Precision
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Advanced machine learning model analyzing 15+ health indicators to provide 
              personalized risk assessment with 94.2% accuracy
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
                <div className="text-3xl font-bold text-foreground mb-2">94.2%</div>
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
                <div className="text-3xl font-bold text-foreground mb-2">15+</div>
                <div className="text-muted-foreground">Risk Factors</div>
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
              Comprehensive analysis using state-of-the-art machine learning algorithms
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
                  Advanced machine learning algorithms trained on thousands of health records 
                  to identify subtle patterns and risk indicators.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Deep learning neural networks
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Feature importance analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Continuous model improvement
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
                  Analyzes multiple health indicators including blood work, lifestyle factors, 
                  and demographic information for complete assessment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Blood glucose & HbA1c analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Cardiovascular risk factors
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Lifestyle & genetic factors
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
                  Receive tailored recommendations and risk timeline projections 
                  based on your individual health profile.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    1, 5, and 10-year projections
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Actionable recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    Risk factor prioritization
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
            Ready to Assess Your Risk?
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
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}