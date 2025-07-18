import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputForm } from "@/components/demo/InputForm";
import { ResultsPanel } from "@/components/demo/ResultsPanel";
import { Loader2, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type FormData = {
  age: number;
  gender: string;
  bmi: number;
  glucose: number;
  hba1c: number;
  systolic_bp: number;
  diastolic_bp: number;
  cholesterol: number;
  triglycerides: number;
  family_history: boolean;
  smoking: boolean;
  activity_level: number;
};

export type PredictionResult = {
  risk_score: number;
  risk_level: string;
  confidence: number;
  timeline: Array<{ years: number; risk: number }>;
  top_factors: Array<{ factor: string; impact: number }>;
  recommendations: string[];
  timestamp: string;
};

export default function Demo() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      age: 45,
      gender: "male",
      bmi: 25,
      glucose: 100,
      hba1c: 5.7,
      systolic_bp: 120,
      diastolic_bp: 80,
      cholesterol: 200,
      triglycerides: 150,
      family_history: false,
      smoking: false,
      activity_level: 3,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call for now
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction result
      const mockResult: PredictionResult = {
        risk_score: 0.25 + Math.random() * 0.5,
        risk_level: Math.random() > 0.6 ? "high" : Math.random() > 0.3 ? "medium" : "low",
        confidence: 0.85 + Math.random() * 0.10,
        timeline: [
          { years: 1, risk: 0.15 },
          { years: 5, risk: 0.28 },
          { years: 10, risk: 0.45 }
        ],
        top_factors: [
          { factor: "BMI", impact: 0.25 },
          { factor: "Age", impact: 0.20 },
          { factor: "HbA1c", impact: 0.18 }
        ],
        recommendations: [
          "Consider weight management program",
          "Increase physical activity to 150 minutes per week",
          "Regular blood sugar monitoring"
        ],
        timestamp: new Date().toISOString()
      };

      setResult(mockResult);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Diabetes Risk Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete the form below to get your personalized Type 2 Diabetes risk assessment
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-8 max-w-4xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertDescription>
            This assessment is for educational purposes only and should not replace professional medical advice. 
            Always consult with a healthcare provider for medical concerns.
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Health Information</span>
                {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InputForm 
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </CardContent>
          </Card>

          {/* Right Panel - Results */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Risk Assessment Results</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {result ? (
                <div className="space-y-4">
                  <ResultsPanel result={result} />
                  <Button 
                    onClick={resetForm}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Form
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    {isLoading ? (
                      <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin" />
                        <p>Analyzing your health data...</p>
                      </div>
                    ) : (
                      <p>Complete the form to see your risk assessment</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}