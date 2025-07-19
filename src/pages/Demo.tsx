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
  gender: string | null;
  
  // Clinical Data
  bmi: number | null;
  systolic_bp: number | null;
  diastolic_bp: number | null;
  num_conditions: number;
  num_visits: number;
  
  // Lab Test Values
  hba1c: number | null;
  glucose: number | null;
  triglycerides: number | null;
  hdl_cholesterol: number | null;
  ldl_cholesterol: number | null;
  
  // Lifestyle and Wearable Stats
  daily_steps: number;
  sleep_duration: number | null;
  stress_level: number | null;
  heart_rate: number | null;
  o2_saturation: number | null;
  
  // Advanced/optional fields
  albumin?: number | null;
  serum_creatinine?: number | null;
  total_cholesterol?: number | null;
  bun_creatinine_ratio?: number | null;
  calories_burned?: number | null;
  pm25_exposure?: number | null;
  nox_exposure?: number | null;
  
  // Other fields
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
      // Demographic
      age: null,
      gender: null,
      
      // Clinical Data
      bmi: null,
      systolic_bp: null,
      diastolic_bp: null,
      num_conditions: 0,
      num_visits: 0,
      
      // Lab Test Values
      hba1c: null,
      glucose: null,
      triglycerides: null,
      hdl_cholesterol: null,
      ldl_cholesterol: null,
      
      // Lifestyle and Wearable Stats
      daily_steps: 0,
      sleep_duration: null,
      stress_level: null,
      heart_rate: null,
      o2_saturation: null,
      
      // Advanced/optional fields
      albumin: null,
      serum_creatinine: null,
      total_cholesterol: null,
      bun_creatinine_ratio: null,
      calories_burned: null,
      pm25_exposure: null,
      nox_exposure: null,
      
      // Existing fields
      family_history: false,
      smoking: false,
      activity_level: 0,
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
    if ((data.systolic_bp !== null && data.systolic_bp >= 140) || (data.diastolic_bp !== null && data.diastolic_bp >= 90)) {
      score += 0.15;
    } else if ((data.systolic_bp !== null && data.systolic_bp >= 130) || (data.diastolic_bp !== null && data.diastolic_bp >= 85)) {
      score += 0.08;
    }
    
    // HbA1c factor (diabetes indicator)
    if (data.hba1c >= 6.5) {
      score += 0.25;
    } else if (data.hba1c >= 5.7) {
      score += 0.15;
    } else if (data.hba1c >= 5.5) {
      score += 0.05;
    }
    
    // Glucose factor
    if (data.glucose >= 126) {
      score += 0.2;
    } else if (data.glucose >= 100) {
      score += 0.1;
    }
    
    // Lifestyle factors
    score += (10 - Math.min(10, data.daily_steps / 1000)) * 0.02; // More steps = lower risk
    score += Math.max(0, 7 - data.sleep_duration) * 0.02; // Less sleep = higher risk
    score += (data.stress_level - 1) * 0.01; // More stress = higher risk
    
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
    
    if (data.bmi >= 25) {
      recs.push("Consider a weight management program to achieve a healthier BMI.");
    }
    
    if (data.hba1c >= 5.7) {
      recs.push("Monitor your blood sugar levels regularly and consult with a healthcare provider.");
    }
    
    if (data.daily_steps < 7000) {
      recs.push("Aim for at least 7,000-10,000 steps per day for better health outcomes.");
    }
    
    if (data.sleep_duration < 7) {
      recs.push("Try to get 7-9 hours of sleep per night for optimal health.");
    }
    
    if (data.stress_level >= 7) {
      recs.push("Consider stress-reduction techniques like meditation or yoga.");
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
        { factor: "HbA1c", impact: 0.3 },
        { factor: "BMI", impact: 0.25 },
        { factor: "Blood Pressure", impact: 0.2 },
        { factor: "Physical Activity", impact: 0.15 },
        { factor: "Age", impact: 0.1 }
      ].sort((a, b) => b.impact - a.impact).slice(0, 3);
      
      // Generate mock result
      const mockResult: PredictionResult = {
        risk_score: riskScore,
        risk_level: riskLevel,
        confidence: 0.85 + Math.random() * 0.10, // 85-95% confidence
        timeline: timeline,
        top_factors: topFactors,
        recommendations: recommendations,
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