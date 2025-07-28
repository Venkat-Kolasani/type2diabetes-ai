import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  Code, 
  Database,
  Brain,
  Award,
  Github,
  Linkedin,
  Mail,
  ExternalLink
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About the Project
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about our team, the development process, and the technology behind 
            our AI-powered diabetes risk prediction system
          </p>
        </div>

        {/* Project Overview */}
        <Card className="shadow-card mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Project Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                DiabetesAI is a research-driven initiative focused on predicting Type 2 Diabetes progression using AI.
                 By leveraging machine learning models trained on the Behavioral Risk Factor Surveillance System (BRFSS) 
                 dataset, the initiative aims to provide accurate and personalized assessments of how Type 2 Diabetes may
                  progress in individuals. The BRFSS dataset, collected from health-related surveys across thousands of individuals 
                  in the U.S., includes multivariate health indicators such as age, BMI, physical activity, smoking habits, and general health status.
                </p>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Developed through rigorous research and validation, DiabetesAI leverages 
                real-world survey data from the BRFSS to model the risk of Type 2 Diabetes. 
                The platform integrates health-related variables and lifestyle factors to 
                deliver user-friendly outputs, supporting personalized risk analysis and 
                raising awareness about long-term diabetes prevention and management.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-primary-light/20 rounded-lg">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">Research Excellence</div>
                  <div className="text-sm text-muted-foreground">Peer-reviewed methodology</div>
                </div>
                <div className="text-center p-4 bg-success-light/20 rounded-lg">
                  <Users className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="font-semibold text-foreground">User-Centered Design</div>
                  <div className="text-sm text-muted-foreground">Intuitive and accessible interface</div>
                </div>
                <div className="text-center p-4 bg-warning-light/20 rounded-lg">
                  <Database className="h-8 w-8 text-warning mx-auto mb-2" />
                  <div className="font-semibold text-foreground">Data Privacy</div>
                  <div className="text-sm text-muted-foreground">Secure & confidential</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="shadow-card mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Our Team</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Our Team</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our team comprises 27 passionate members organized into 5 specialized subteams, 
                collaborating to drive the DiabetesAI project forward. These subteams include:
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-primary-light/20 rounded-lg">
                  <h4 className="font-semibold text-foreground">Data Preprocessing</h4>
                  <p className="text-sm text-muted-foreground">Cleaning and preparing BRFSS data</p>
                </div>
                <div className="p-3 bg-success-light/20 rounded-lg">
                  <h4 className="font-semibold text-foreground">Evaluation</h4>
                  <p className="text-sm text-muted-foreground">Assessing model performance metrics</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-warning-light/20 rounded-lg">
                  <h4 className="font-semibold text-foreground">Feature Engineering</h4>
                  <p className="text-sm text-muted-foreground">Creating relevant health features</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-foreground">Model Training</h4>
                  <p className="text-sm text-muted-foreground">Training machine learning models</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="p-3 bg-danger-light/20 rounded-lg w-1/2">
                  <h4 className="font-semibold text-foreground">Web Designing</h4>
                  <p className="text-sm text-muted-foreground">Crafting the user interface</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Under the esteemed guidance of faculty from North-Chiang Mai University (NCMU), Thailand.
              </p>
              <div className="mt-6">
                <Button variant="outline" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Our Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Timeline */}
        <Card className="shadow-card mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Project Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">Q1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Research & Data Collection</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                   DiabetesAI uses the preprocessed BRFSS dataset, with over 400,000 responses and 30+ multivariate health indicators (clinical, lifestyle, demographic), to build an AI model predicting Type 2 Diabetes progression using AI.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-success-foreground">Q2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Model Development</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Developed and trained multiple machine learning models, 
                    performed feature engineering and hyperparameter tuning
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-warning rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-warning-foreground">Q3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">System Implementation</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Built web application, implemented backend API, 
                    and created user interface for model interaction
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-danger rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-danger-foreground">Q4</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Testing & Deployment</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Conducted thorough testing, validation studies, 
                    and deployed the final system for public use
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card className="shadow-card mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>Technical Specifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Frontend Technologies</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">React 18</Badge>
                    <span className="text-muted-foreground">Modern UI framework</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <span className="text-muted-foreground">Type-safe development</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <span className="text-muted-foreground">Responsive design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">Recharts</Badge>
                    <span className="text-muted-foreground">Data visualization</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Backend Technologies</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">Python Flask</Badge>
                    <span className="text-muted-foreground">API framework</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">Scikit-learn</Badge>
                    <span className="text-muted-foreground">Machine learning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">Pandas</Badge>
                    <span className="text-muted-foreground">Data processing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Badge variant="outline">NumPy</Badge>
                    <span className="text-muted-foreground">Numerical computing</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Have questions about our research or want to collaborate? 
                We'd love to hear from you!
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </Button>
                <Button variant="outline" size="lg">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </Button>
                <Button variant="outline" size="lg">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Research Paper
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}