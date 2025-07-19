import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from "@/pages/Demo";
import { User, Stethoscope, FlaskConical, Activity, Heart, Moon, Loader2, ChevronDown, ChevronUp, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

const hideNumberInputSpinners = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

interface InputFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function InputForm({ form, onSubmit, isLoading, disabled }: InputFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  const watchedValues = watch();
  const [showAdvanced, setShowAdvanced] = useState(false);

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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="age">Age</Label>
              <div className="text-sm text-muted-foreground">
                {watchedValues.age || '18-100'}
              </div>
            </div>
            <Slider
              id="age"
              min={18}
              max={100}
              step={1}
              value={[watchedValues.age || 0]}
              onValueChange={(value) => setValue("age", value[0])}
              disabled={disabled}
              className="w-full py-2"
              aria-label="Age in years"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>18</span>
              <span>100</span>
            </div>
            {errors.age && (
              <p className="text-sm text-destructive">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={watchedValues.gender}
              onValueChange={(value) => setValue("gender", value)}
              disabled={disabled}
              aria-label="Gender selection"
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
        </CardContent>
      </Card>

      {/* Clinical Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="h-5 w-5" />
            <span>Clinical Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bmi">BMI (kg/m²)</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                min="15"
                max="50"
                placeholder="e.g., 24.5"
                {...register("bmi", { 
                  required: "BMI is required",
                  min: { value: 15, message: "BMI must be at least 15" },
                  max: { value: 50, message: "BMI must be less than 50" }
                })}
                disabled={disabled}
                aria-describedby="bmi-help"
                className={hideNumberInputSpinners}
              />

              {errors.bmi && (
                <p className="text-sm text-destructive">{errors.bmi.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="systolic_bp">Systolic BP (mmHg)</Label>
              <Input
                id="systolic_bp"
                type="number"
                min="70"
                max="200"
                placeholder="e.g., 120"
                {...register("systolic_bp", {
                  required: "Systolic BP is required",
                  min: { value: 70, message: "Systolic BP must be at least 70" },
                  max: { value: 200, message: "Systolic BP must be less than 200" }
                })}
                disabled={disabled}
                aria-describedby="systolic-help"
              />
              <p id="systolic-help" className="text-xs text-muted-foreground">
                Normal: &lt;120 mmHg
              </p>
              {errors.systolic_bp && (
                <p className="text-sm text-destructive">{errors.systolic_bp.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic_bp">Diastolic BP (mmHg)</Label>
              <Input
                id="diastolic_bp"
                type="number"
                min="40"
                max="120"
                placeholder="e.g., 80"
                {...register("diastolic_bp", {
                  required: "Diastolic BP is required",
                  min: { value: 40, message: "Diastolic BP must be at least 40" },
                  max: { value: 120, message: "Diastolic BP must be less than 120" }
                })}
                disabled={disabled}
                aria-describedby="diastolic-help"
              />
              <p id="diastolic-help" className="text-xs text-muted-foreground">
                Normal: &lt;80 mmHg
              </p>
              {errors.diastolic_bp && (
                <p className="text-sm text-destructive">{errors.diastolic_bp.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="num_conditions">Number of Conditions</Label>
              <Input
                id="num_conditions"
                type="number"
                min="0"
                max="20"
                placeholder="e.g., 2"
                {...register("num_conditions", {
                  required: "Number of conditions is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 20, message: "Maximum 20 conditions" }
                })}
                disabled={disabled}
                aria-describedby="conditions-help"
              />
              <p id="conditions-help" className="text-xs text-muted-foreground">
                Count of diagnosed conditions (e.g., hypertension, high cholesterol)
              </p>
              {errors.num_conditions && (
                <p className="text-sm text-destructive">{errors.num_conditions.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="num_visits">Number of Visits (past year)</Label>
              <Input
                id="num_visits"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 5"
                {...register("num_visits", {
                  required: "Number of visits is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 100, message: "Maximum 100 visits" }
                })}
                disabled={disabled}
                aria-describedby="visits-help"
              />
              <p id="visits-help" className="text-xs text-muted-foreground">
                Number of healthcare visits in the past 12 months
              </p>
              {errors.num_visits && (
                <p className="text-sm text-destructive">{errors.num_visits.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lab Test Values */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Droplets className="h-5 w-5" />
            <span>Lab Test Values</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hba1c">HbA1c (%)</Label>
              <div className="relative">
                <Input
                  id="hba1c"
                  type="number"
                  step="0.1"
                  min="4.0"
                  max="15.0"
                  placeholder="e.g., 5.4"
                  {...register("hba1c", {
                    required: "HbA1c is required",
                    min: { value: 4.0, message: "HbA1c must be at least 4.0" },
                    max: { value: 15.0, message: "HbA1c must be less than 15.0" }
                  })}
                  disabled={disabled}
                  aria-describedby="hba1c-help"
                />

              </div>

              {errors.hba1c && (
                <p className="text-sm text-destructive">{errors.hba1c.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="glucose">Fasting Glucose (mg/dL)</Label>
              <div className="relative">
                <Input
                  id="glucose"
                  type="number"
                  min="70"
                  max="200"
                  placeholder="e.g., 95"
                  {...register("glucose", {
                    required: "Fasting glucose is required",
                    min: { value: 70, message: "Glucose must be at least 70" },
                    max: { value: 200, message: "Glucose must be less than 200" }
                  })}
                  disabled={disabled}
                  className={hideNumberInputSpinners}
                />
              </div>
              {errors.glucose && (
                <p className="text-sm text-destructive">{errors.glucose.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="o2_saturation">O₂ Saturation (%)</Label>
              <div className="relative">
                <Input
                  id="o2_saturation"
                  type="number"
                  min="70"
                  max="100"
                  placeholder="e.g., 98"
                  {...register("o2_saturation", {
                    required: "O₂ Saturation is required",
                    min: { value: 70, message: "O₂ Saturation must be at least 70%" },
                    max: { value: 100, message: "O₂ Saturation cannot exceed 100%" }
                  })}
                  disabled={disabled}
                  className={hideNumberInputSpinners}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Normal: 95-100%
              </p>
              {errors.o2_saturation && (
                <p className="text-sm text-destructive">{errors.o2_saturation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
              <div className="relative">
                <Input
                  id="triglycerides"
                  type="number"
                  min="30"
                  max="1000"
                  placeholder="e.g., 150"
                  {...register("triglycerides", {
                    required: "Triglycerides are required",
                    min: { value: 30, message: "Triglycerides must be at least 30" },
                    max: { value: 1000, message: "Triglycerides must be less than 1000" }
                  })}
                  disabled={disabled}
                  aria-describedby="triglycerides-help"
                />

              </div>

              {errors.triglycerides && (
                <p className="text-sm text-destructive">{errors.triglycerides.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hdl_cholesterol">HDL Cholesterol (mg/dL)</Label>
              <div className="relative">
                <Input
                  id="hdl_cholesterol"
                  type="number"
                  min="10"
                  max="120"
                  placeholder="e.g., 60"
                  {...register("hdl_cholesterol", {
                    required: "HDL Cholesterol is required",
                    min: { value: 10, message: "HDL must be at least 10" },
                    max: { value: 120, message: "HDL must be less than 120" }
                  })}
                  disabled={disabled}
                  aria-describedby="hdl-help"
                />

              </div>
              <p id="hdl-help" className="text-xs text-muted-foreground">
                Optimal: ≥60 mg/dL, Low: &lt;40 mg/dL (men) or &lt;50 mg/dL (women)
              </p>
              {errors.hdl_cholesterol && (
                <p className="text-sm text-destructive">{errors.hdl_cholesterol.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ldl_cholesterol">LDL Cholesterol (mg/dL)</Label>
              <div className="relative">
                <Input
                  id="ldl_cholesterol"
                  type="number"
                  min="30"
                  max="300"
                  placeholder="e.g., 100"
                  {...register("ldl_cholesterol", {
                    required: "LDL Cholesterol is required",
                    min: { value: 30, message: "LDL must be at least 30" },
                    max: { value: 300, message: "LDL must be less than 300" }
                  })}
                  disabled={disabled}
                  aria-describedby="ldl-help"
                />

              </div>
              <p id="ldl-help" className="text-xs text-muted-foreground">
                Optimal: &lt;100 mg/dL, Near Optimal: 100-129 mg/dL, Borderline: 130-159 mg/dL
              </p>
              {errors.ldl_cholesterol && (
                <p className="text-sm text-destructive">{errors.ldl_cholesterol.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle and Wearable Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Lifestyle and Wearable Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="daily_steps">Daily Steps</Label>
              <div className="relative">
                <Input
                  id="daily_steps"
                  type="number"
                  min="0"
                  max="50000"
                  placeholder="e.g., 7500"
                  {...register("daily_steps", {
                    required: "Daily steps are required",
                    min: { value: 0, message: "Steps cannot be negative" },
                    max: { value: 50000, message: "Maximum 50,000 steps" }
                  })}
                  disabled={disabled}
                  aria-describedby="steps-help"
                />

              </div>
              <p id="steps-help" className="text-xs text-muted-foreground">
                Target: 7,000-10,000 steps/day for health benefits
              </p>
              {errors.daily_steps && (
                <p className="text-sm text-destructive">{errors.daily_steps.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleep_duration">Sleep Duration (hours)</Label>
              <div className="relative">
                <Input
                  id="sleep_duration"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  placeholder="e.g., 7.5"
                  {...register("sleep_duration", {
                    required: "Sleep duration is required",
                    min: { value: 0, message: "Cannot be negative" },
                    max: { value: 24, message: "Maximum 24 hours" }
                  })}
                  disabled={disabled}
                  aria-describedby="sleep-help"
                />
                <div className="absolute right-2 top-2 text-muted-foreground">
                  <Moon className="h-4 w-4" />
                </div>
              </div>
              <p id="sleep-help" className="text-xs text-muted-foreground">
                Recommended: 7-9 hours for adults
              </p>
              {errors.sleep_duration && (
                <p className="text-sm text-destructive">{errors.sleep_duration.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stress_level">Stress Level (1-10)</Label>
              <div className="relative">
                <Input
                  id="stress_level"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="1-10, 10 being highest"
                  {...register("stress_level", {
                    required: "Stress level is required",
                    min: { value: 1, message: "Minimum is 1" },
                    max: { value: 10, message: "Maximum is 10" }
                  })}
                  disabled={disabled}
                  className={hideNumberInputSpinners}
                />
              </div>
              {errors.stress_level && (
                <p className="text-sm text-destructive">{errors.stress_level.message}</p>
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
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="activity_level">Activity Level</Label>
                <div className="text-sm text-muted-foreground">
                  {watchedValues.activity_level > 0 ? 
                    [
                      'Not set',
                      'Sedentary',
                      'Lightly Active',
                      'Moderately Active',
                      'Very Active',
                      'Extremely Active'
                    ][watchedValues.activity_level]
                    : 'Not set'
                  }
                </div>
              </div>
              <Slider
                id="activity_level"
                min={1}
                max={5}
                step={1}
                value={[watchedValues.activity_level > 0 ? watchedValues.activity_level : 1]}
                onValueChange={(value) => setValue("activity_level", value[0] || 1)}
                disabled={disabled}
                className="w-full py-2"
                aria-label="Activity level from 1 (Sedentary) to 5 (Extremely Active)"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 (Sedentary)</span>
                <span>5 (Extremely Active)</span>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Slide to select your activity level
              </div>
            </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="family_history"
                checked={watchedValues.family_history || false}
                onCheckedChange={(checked) => setValue("family_history", Boolean(checked))}
                disabled={disabled}
              />
              <Label htmlFor="family_history" className="font-normal">
                Family history of diabetes
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="smoking"
                checked={watchedValues.smoking || false}
                onCheckedChange={(checked) => setValue("smoking", Boolean(checked))}
                disabled={disabled}
              />
              <Label htmlFor="smoking">Current smoker</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Metrics</span>
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        <div 
          id="advanced-options"
          className={cn(
            "space-y-6 overflow-hidden transition-all duration-300 ease-in-out",
            showAdvanced ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FlaskConical className="h-5 w-5" />
                <span>Advanced Lab Tests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="albumin">Albumin (g/dL)</Label>
                  <div className="relative">
                    <Input
                      id="albumin"
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="6.0"
                      {...register("albumin", {
                        min: { value: 1.0, message: "Albumin must be at least 1.0" },
                        max: { value: 6.0, message: "Albumin must be less than 6.0" }
                      })}
                      disabled={disabled}
                      aria-describedby="albumin-help"
                    />
                  </div>
                  <p id="albumin-help" className="text-xs text-muted-foreground">
                    Normal: 3.5-5.0 g/dL
                  </p>
                  {errors.albumin && (
                    <p className="text-sm text-destructive">{errors.albumin.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serum_creatinine">Serum Creatinine (mg/dL)</Label>
                  <div className="relative">
                    <Input
                      id="serum_creatinine"
                      type="number"
                      step="0.01"
                      min="0.1"
                      max="10.0"
                      {...register("serum_creatinine", {
                        min: { value: 0.1, message: "Creatinine must be at least 0.1" },
                        max: { value: 10.0, message: "Creatinine must be less than 10.0" }
                      })}
                      disabled={disabled}
                      aria-describedby="creatinine-help"
                    />
                  </div>
                  <p id="creatinine-help" className="text-xs text-muted-foreground">
                    Normal: 0.7-1.3 mg/dL (men), 0.6-1.1 mg/dL (women)
                  </p>
                  {errors.serum_creatinine && (
                    <p className="text-sm text-destructive">{errors.serum_creatinine.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total_cholesterol">Total Cholesterol (mg/dL)</Label>
                  <div className="relative">
                    <Input
                      id="total_cholesterol"
                      type="number"
                      min="100"
                      max="400"
                      {...register("total_cholesterol", {
                        min: { value: 100, message: "Must be at least 100" },
                        max: { value: 400, message: "Must be less than 400" }
                      })}
                      disabled={disabled}
                      aria-describedby="total-chol-help"
                    />

                  </div>
                  <p id="total-chol-help" className="text-xs text-muted-foreground">
                    Desirable: &lt;200 mg/dL, Borderline: 200-239 mg/dL
                  </p>
                  {errors.total_cholesterol && (
                    <p className="text-sm text-destructive">{errors.total_cholesterol.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bun_creatinine_ratio">BUN/Creatinine Ratio</Label>
                  <div className="relative">
                    <Input
                      id="bun_creatinine_ratio"
                      type="number"
                      min="5"
                      max="40"
                      {...register("bun_creatinine_ratio", {
                        min: { value: 5, message: "Must be at least 5" },
                        max: { value: 40, message: "Must be less than 40" }
                      })}
                      disabled={disabled}
                      aria-describedby="bun-ratio-help"
                    />

                  </div>
                  <p id="bun-ratio-help" className="text-xs text-muted-foreground">
                    Normal: 10:1 to 20:1
                  </p>
                  {errors.bun_creatinine_ratio && (
                    <p className="text-sm text-destructive">{errors.bun_creatinine_ratio.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Lifestyle & Environmental Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories_burned">Daily Calories Burned</Label>
                  <div className="relative">
                    <Input
                      id="calories_burned"
                      type="number"
                      min="500"
                      max="5000"
                      {...register("calories_burned", {
                        min: { value: 500, message: "Must be at least 500" },
                        max: { value: 5000, message: "Must be less than 5000" }
                      })}
                      disabled={disabled}
                      aria-describedby="calories-help"
                    />

                  </div>
                  <p id="calories-help" className="text-xs text-muted-foreground">
                    Average: 1,600-3,000 kcal/day
                  </p>
                  {errors.calories_burned && (
                    <p className="text-sm text-destructive">{errors.calories_burned.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pm25_exposure">PM 2.5 Exposure (µg/m³)</Label>
                  <div className="relative">
                    <Input
                      id="pm25_exposure"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      {...register("pm25_exposure", {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 100, message: "Must be less than 100" }
                      })}
                      disabled={disabled}
                      aria-describedby="pm25-help"
                    />

                  </div>
                  <p id="pm25-help" className="text-xs text-muted-foreground">
                    WHO Guideline: &lt;5 µg/m³ annual mean
                  </p>
                  {errors.pm25_exposure && (
                    <p className="text-sm text-destructive">{errors.pm25_exposure.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nox_exposure">NOx Exposure (ppb)</Label>
                  <div className="relative">
                    <Input
                      id="nox_exposure"
                      type="number"
                      min="0"
                      max="200"
                      {...register("nox_exposure", {
                        min: { value: 0, message: "Cannot be negative" },
                        max: { value: 200, message: "Must be less than 200" }
                      })}
                      disabled={disabled}
                      aria-describedby="nox-help"
                    />

                  </div>
                  <p id="nox-help" className="text-xs text-muted-foreground">
                    EPA 1-hour standard: 100 ppb
                  </p>
                  {errors.nox_exposure && (
                    <p className="text-sm text-destructive">{errors.nox_exposure.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          disabled={isLoading || disabled}
          className="w-full sm:w-auto"
        >
          Reset Form
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || disabled}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Diabetes Risk"
          )}
        </Button>
      </div>
    </form>
  );
}