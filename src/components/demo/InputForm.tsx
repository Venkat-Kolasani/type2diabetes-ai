import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from "@/pages/Demo";
import { User, Activity, Heart, Droplets } from "lucide-react";

interface InputFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function InputForm({ form, onSubmit, isLoading, disabled }: InputFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  const watchedValues = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Demographics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age: {watchedValues.age}</Label>
            <Slider
              id="age"
              min={18}
              max={100}
              step={1}
              value={[watchedValues.age]}
              onValueChange={(value) => setValue("age", value[0])}
              disabled={disabled}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={watchedValues.gender}
              onValueChange={(value) => setValue("gender", value)}
              disabled={disabled}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bmi">BMI (kg/m²)</Label>
            <Input
              id="bmi"
              type="number"
              step="0.1"
              min="15"
              max="50"
              {...register("bmi", { 
                required: "BMI is required",
                min: { value: 15, message: "BMI must be at least 15" },
                max: { value: 50, message: "BMI must be less than 50" }
              })}
              disabled={disabled}
            />
            {errors.bmi && (
              <p className="text-sm text-destructive">{errors.bmi.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5" />
            <span>Health Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="glucose">Fasting Glucose (mg/dL)</Label>
              <Input
                id="glucose"
                type="number"
                min="70"
                max="200"
                {...register("glucose", {
                  required: "Glucose is required",
                  min: { value: 70, message: "Glucose must be at least 70" },
                  max: { value: 200, message: "Glucose must be less than 200" }
                })}
                disabled={disabled}
              />
              {errors.glucose && (
                <p className="text-sm text-destructive">{errors.glucose.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hba1c">HbA1c (%)</Label>
              <Input
                id="hba1c"
                type="number"
                step="0.1"
                min="4.0"
                max="15.0"
                {...register("hba1c", {
                  required: "HbA1c is required",
                  min: { value: 4.0, message: "HbA1c must be at least 4.0" },
                  max: { value: 15.0, message: "HbA1c must be less than 15.0" }
                })}
                disabled={disabled}
              />
              {errors.hba1c && (
                <p className="text-sm text-destructive">{errors.hba1c.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
              <Input
                id="cholesterol"
                type="number"
                min="100"
                max="400"
                {...register("cholesterol", {
                  required: "Cholesterol is required",
                  min: { value: 100, message: "Cholesterol must be at least 100" },
                  max: { value: 400, message: "Cholesterol must be less than 400" }
                })}
                disabled={disabled}
              />
              {errors.cholesterol && (
                <p className="text-sm text-destructive">{errors.cholesterol.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
              <Input
                id="triglycerides"
                type="number"
                min="50"
                max="500"
                {...register("triglycerides", {
                  required: "Triglycerides are required",
                  min: { value: 50, message: "Triglycerides must be at least 50" },
                  max: { value: 500, message: "Triglycerides must be less than 500" }
                })}
                disabled={disabled}
              />
              {errors.triglycerides && (
                <p className="text-sm text-destructive">{errors.triglycerides.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blood Pressure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Blood Pressure</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic_bp">Systolic BP (mmHg)</Label>
              <Input
                id="systolic_bp"
                type="number"
                min="90"
                max="200"
                {...register("systolic_bp", {
                  required: "Systolic BP is required",
                  min: { value: 90, message: "Systolic BP must be at least 90" },
                  max: { value: 200, message: "Systolic BP must be less than 200" }
                })}
                disabled={disabled}
              />
              {errors.systolic_bp && (
                <p className="text-sm text-destructive">{errors.systolic_bp.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic_bp">Diastolic BP (mmHg)</Label>
              <Input
                id="diastolic_bp"
                type="number"
                min="60"
                max="120"
                {...register("diastolic_bp", {
                  required: "Diastolic BP is required",
                  min: { value: 60, message: "Diastolic BP must be at least 60" },
                  max: { value: 120, message: "Diastolic BP must be less than 120" }
                })}
                disabled={disabled}
              />
              {errors.diastolic_bp && (
                <p className="text-sm text-destructive">{errors.diastolic_bp.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Lifestyle Factors</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Activity Level: {watchedValues.activity_level}</Label>
            <Slider
              id="activity_level"
              min={1}
              max={5}
              step={1}
              value={[watchedValues.activity_level]}
              onValueChange={(value) => setValue("activity_level", value[0])}
              disabled={disabled}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Sedentary</span>
              <span>Very Active</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="family_history"
                checked={watchedValues.family_history}
                onCheckedChange={(checked) => setValue("family_history", checked as boolean)}
                disabled={disabled}
              />
              <Label htmlFor="family_history">Family history of diabetes</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="smoking"
                checked={watchedValues.smoking}
                onCheckedChange={(checked) => setValue("smoking", checked as boolean)}
                disabled={disabled}
              />
              <Label htmlFor="smoking">Current smoker</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isLoading || disabled}
      >
        {isLoading ? "Analyzing..." : "Get Risk Prediction"}
      </Button>
    </form>
  );
}