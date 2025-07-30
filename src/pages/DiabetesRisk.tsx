import { useState } from "react";
import { useForm } from "react-hook-form";
import { DiabetesRiskForm } from "@/components/diabetes/DiabetesRiskForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { API_CONFIG } from "@/config/api";

export type FormData = {
  HighBP: number | null; HighChol: number | null; CholCheck: number | null; Smoker: number | null;
  Stroke: number | null; HeartDiseaseorAttack: number | null; PhysActivity: number | null; Fruits: number | null;
  Veggies: number | null; HvyAlcoholConsump: number | null; AnyHealthcare: number | null; NoDocbcCost: number | null;
  DiffWalk: number | null; Sex: number | null; BMI: number | null; GenHlth: number | null; MentHlth: number | null;
  PhysHlth: number | null; Age: number | null; Education: number | null; Income: number | null;
};

type ApiResponse = { prediction: number };

export default function DiabetesRisk() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({ defaultValues: {} as FormData });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setPrediction(null);
    setError(null);

    try {
      // Convert null values to 0 for API compatibility
      const payload = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value ?? 0])
      );

      // Create timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const res = await fetch(`${API_CONFIG.BACKEND_URL}${API_CONFIG.ENDPOINTS.PREDICT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        // Handle different HTTP status codes
        if (res.status >= 500) {
          throw new Error('server');
        } else if (res.status >= 400) {
          throw new Error('validation');
        } else {
          throw new Error('network');
        }
      }

      const json = await res.json();
      
      // Validate response structure
      if (typeof json.prediction !== 'number') {
        throw new Error('validation');
      }
      
      setPrediction(json.prediction);
    } catch (err) {
      console.error("Prediction error:", err);
      
      // Set appropriate error message based on error type
      let errorMessage = API_CONFIG.ERROR_MESSAGES.SERVER; // Default
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = API_CONFIG.ERROR_MESSAGES.TIMEOUT;
        } else if (err.message === 'network') {
          errorMessage = API_CONFIG.ERROR_MESSAGES.NETWORK;
        } else if (err.message === 'validation') {
          errorMessage = API_CONFIG.ERROR_MESSAGES.VALIDATION;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Diabetes Risk Assessment</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Enter Your Information</CardTitle></CardHeader>
            <CardContent>
              <DiabetesRiskForm form={form} onSubmit={onSubmit} isLoading={isLoading} disabled={isLoading} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader><CardTitle>Prediction Result</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center py-10">
              {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
              {!isLoading && prediction === null && <p className="text-muted-foreground text-center">Fill the form and submit to see your result.</p>}
              {!isLoading && prediction !== null && (
                <div className="text-center space-y-2">
                  <p className={`text-4xl font-bold ${prediction === 1 ? "text-red-600" : "text-green-600"}`}>{prediction === 1 ? "Diabetes Likely" : "No Diabetes"}</p>
                  <p className="text-muted-foreground text-sm">Model prediction value: {prediction}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
