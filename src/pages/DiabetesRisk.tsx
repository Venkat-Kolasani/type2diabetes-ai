import { useState } from "react";
import { useForm } from "react-hook-form";
import { DiabetesRiskForm } from "@/components/diabetes/DiabetesRiskForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";

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
    setIsLoading(true); setError(null); setPrediction(null);
    const payload = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v ?? 0])
    );
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'https://type2diabetes-ai-backend.up.railway.app'}/predict`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || "Failed to get prediction");
      }
      const json: ApiResponse = await res.json();
      setPrediction(json.prediction);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally { setIsLoading(false); }
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
