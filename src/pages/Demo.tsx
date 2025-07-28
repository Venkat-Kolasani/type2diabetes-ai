import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputForm } from "@/components/demo/InputForm";
import { ResultsPanel } from "@/components/demo/ResultsPanel";
import { Loader2, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type FormData = {
  // Demographic
  age: number | null;
  sex: string | null;
  education: string | null;
  income: string | null;
  
  // Clinical Data
  bmi: number | null;
  high_blood_pressure: string | null;
  high_cholesterol: string | null;
  cholesterol_check: string | null;
  general_health: string | null;
  difficulty_walking: string | null;
  couldnt_see_doctor: string | null;
  has_healthcare: string | null;
  
  // Lifestyle and Behavioral Stats
  smoked_100_cigarettes: string | null;
  heavy_alcohol: string | null;
  physical_activity: string | null;
  fruit_consumption: number | null;
  vegetable_consumption: number | null;
  
  // Mental and Physical Health Stats
  poor_mental_health: number | null;
  poor_physical_health: number | null;
  history_stroke: string | null;
  history_heart_disease: string | null;
};

export type PredictionResult = {
  risk_score: number;
  risk_level: string;
  confidence: number;
  timeline: Array<{ years: number; risk: number }>;
  top_factors: Array<{ factor: string; impact: number }>;
  recommendations: string[];
  timestamp: string;
  diabetes_status: number; // 0: no-diabetes, 1: pre-diabetic, 2: diabetic
};

export default function Demo() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      // Demographic
      age: null,
      sex: null,
      education: null,
      income: null,
      
      // Clinical Data
      bmi: null,
      high_blood_pressure: null,
      high_cholesterol: null,
      cholesterol_check: null,
      general_health: null,
      difficulty_walking: null,
      couldnt_see_doctor: null,
      has_healthcare: null,
      
      // Lifestyle and Behavioral Stats
      smoked_100_cigarettes: null,
      heavy_alcohol: null,
      physical_activity: null,
      fruit_consumption: null,
      vegetable_consumption: null,
      
      // Mental and Physical Health Stats
      poor_mental_health: null,
      poor_physical_health: null,
      history_stroke: null,
      history_heart_disease: null,
    },
  });

  const calculateRiskScore = (data: FormData): number => {
    // Base risk score (0-1)
    let score = 0;
    
    // Age factor (higher risk over 45)
    score += Math.min((data.age ?? 0) / 100, 0.15);
    
    // BMI factor (higher risk if > 25)
    if (data.bmi !== null) {
      score += Math.max(0, (data.bmi - 25) * 0.01);
    }
    // Blood pressure factors
    if ((data.high_blood_pressure === "Yes") || (data.high_blood_pressure === "Yes, I have been told I have high blood pressure")) {
      score += 0.15;
    }
    
    // Cholesterol factors
    if ((data.high_cholesterol === "Yes") || (data.high_cholesterol === "Yes, I have been told I have high cholesterol")) {
      score += 0.15;
    }
    
    // Mental health factor
    if (data.poor_mental_health !== null && data.poor_mental_health >= 3) { // Poor mental health score >= 3
      score += 0.2;
    }
    
    // Physical activity factor
    if (data.physical_activity?.toLowerCase() === "yes") {
      score += 0.1;
    }
    
    // Cap the score between 0 and 1
    return Math.min(1, Math.max(0, score));
  };

  const getRiskLevel = (score: number): string => {
    if (score >= 0.7) return 'high';
    if (score >= 0.4) return 'medium';
    return 'low';
  };

  const getRecommendations = (data: FormData): string[] => {
    const recs: string[] = [];
    
    if (data.bmi !== null && data.bmi >= 25) {
      recs.push("Consider a weight management program to achieve a healthier BMI.");
    }
    
    if (data.high_blood_pressure === "yes") {
      recs.push("Monitor your blood pressure regularly and consult with a healthcare provider.");
    }
    
    if (data.high_cholesterol === "yes") {
      recs.push("Monitor your cholesterol levels regularly and consult with a healthcare provider.");
    }
    
    if (data.poor_mental_health !== null && data.poor_mental_health >= 3) {
      recs.push("Consider seeking professional help for mental health concerns.");
    }
    
    if (data.physical_activity === "no") {
      recs.push("Engage in regular physical activity to improve your overall health.");
    }
    
    if (recs.length === 0) {
      recs.push("Maintain your healthy lifestyle with balanced nutrition and regular exercise.");
    }
    
    return recs;
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate risk score based on inputs
      const riskScore = calculateRiskScore(data);
      const riskLevel = getRiskLevel(riskScore);
      const recommendations = getRecommendations(data);
      
      // Generate a realistic timeline based on risk factors
      const baseYearlyIncrease = riskScore * 0.1;
      const timeline = [
        { years: 1, risk: Math.min(1, riskScore * (1 + baseYearlyIncrease)) },
        { years: 3, risk: Math.min(1, riskScore * (1 + baseYearlyIncrease * 3)) },
        { years: 5, risk: Math.min(1, riskScore * (1 + baseYearlyIncrease * 5)) },
        { years: 10, risk: Math.min(1, riskScore * (1 + baseYearlyIncrease * 10)) }
      ];
      
      // Identify top risk factors
      const topFactors = [
        { factor: "BMI", impact: 0.25 },
        { factor: "Blood Pressure", impact: 0.2 },
        { factor: "Cholesterol", impact: 0.2 },
        { factor: "Mental Health", impact: 0.15 },
        { factor: "Physical Activity", impact: 0.1 }
      ].sort((a, b) => b.impact - a.impact).slice(0, 3);
      
      // Generate mock result
      const mockResult: PredictionResult = {
        risk_score: riskScore,
        risk_level: riskLevel,
        confidence: 0.85 + Math.random() * 0.10, // 85-95% confidence
        timeline: timeline,
        top_factors: topFactors,
        recommendations: recommendations,
        timestamp: new Date().toISOString(),
        diabetes_status: riskScore >= 0.7 ? 2 : (riskScore >= 0.4 ? 1 : 0) // 0: no-diabetes, 1: pre-diabetic, 2: diabetic
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