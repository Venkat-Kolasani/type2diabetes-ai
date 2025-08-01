import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/pages/Demo";
import { User, Stethoscope, FlaskConical, Activity, Heart, Moon, Loader2, ChevronDown, ChevronUp, Droplets, Brain, Apple } from "lucide-react";
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
            <span>Demographic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="age">Age</Label>
              <div className="text-sm text-muted-foreground">
                {watchedValues.age || '18-99'}
              </div>
            </div>
            <Slider
              id="age"
              min={18}
              max={99}
              step={1}
              value={[watchedValues.age || 0]}
              onValueChange={(value) => setValue("age", value[0])}
              disabled={disabled}
              className="w-full py-2"
              aria-label="Age in years"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>18</span>
              <span>99</span>
            </div>
            {errors.age && (
              <p className="text-sm text-destructive">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Sex</Label>
            <RadioGroup
              value={watchedValues.sex}
              onValueChange={(value) => setValue("sex", value)}
              disabled={disabled}
              aria-label="Sex selection"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education Level</Label>
            <Select
              value={watchedValues.education}
              onValueChange={(value) => setValue("education", value)}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never_attended">Never attended school</SelectItem>
                <SelectItem value="grades_1_8">Grades 1–8</SelectItem>
                <SelectItem value="grades_9_11">Grades 9–11</SelectItem>
                <SelectItem value="high_school">High School Graduate</SelectItem>
                <SelectItem value="some_college">Some College</SelectItem>
                <SelectItem value="college_graduate">College Graduate</SelectItem>
              </SelectContent>
            </Select>
            {errors.education && (
              <p className="text-sm text-destructive">{errors.education.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">Income Level</Label>
            <Select
              value={watchedValues.income}
              onValueChange={(value) => setValue("income", value)}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select income level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under_15000">&lt; 15,000</SelectItem>
                <SelectItem value="15000_24999">15,000 – 24,999</SelectItem>
                <SelectItem value="25000_34999">25,000 – 34,999</SelectItem>
                <SelectItem value="35000_49999">35,000 – 49,999</SelectItem>
                <SelectItem value="50000_74999">50,000 – 74,999</SelectItem>
                <SelectItem value="75000_plus">75,000+</SelectItem>
              </SelectContent>
            </Select>
            {errors.income && (
              <p className="text-sm text-destructive">{errors.income.message}</p>
            )}
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
              <p id="bmi-help" className="text-xs text-muted-foreground">
                Normal: 18.5-24.9, Overweight: 25-29.9, Obese: ≥30
              </p>
              {errors.bmi && (
                <p className="text-sm text-destructive">{errors.bmi.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="high_blood_pressure">High Blood Pressure</Label>
              <RadioGroup
                value={watchedValues.high_blood_pressure}
                onValueChange={(value) => setValue("high_blood_pressure", value)}
                disabled={disabled}
                aria-label="High blood pressure selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hbp_yes" />
                  <Label htmlFor="hbp_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hbp_no" />
                  <Label htmlFor="hbp_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="high_cholesterol">High Cholesterol</Label>
              <RadioGroup
                value={watchedValues.high_cholesterol}
                onValueChange={(value) => setValue("high_cholesterol", value)}
                disabled={disabled}
                aria-label="High cholesterol selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hc_yes" />
                  <Label htmlFor="hc_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hc_no" />
                  <Label htmlFor="hc_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cholesterol_check">Cholesterol Check (past 5 years)</Label>
              <RadioGroup
                value={watchedValues.cholesterol_check}
                onValueChange={(value) => setValue("cholesterol_check", value)}
                disabled={disabled}
                aria-label="Cholesterol check selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="cc_yes" />
                  <Label htmlFor="cc_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="cc_no" />
                  <Label htmlFor="cc_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="general_health">General Health Rating</Label>
              <Select
                value={watchedValues.general_health}
                onValueChange={(value) => setValue("general_health", value)}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select health rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="very_good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
              {errors.general_health && (
                <p className="text-sm text-destructive">{errors.general_health.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty_walking">Difficulty Walking</Label>
              <RadioGroup
                value={watchedValues.difficulty_walking}
                onValueChange={(value) => setValue("difficulty_walking", value)}
                disabled={disabled}
                aria-label="Difficulty walking selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="dw_yes" />
                  <Label htmlFor="dw_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="dw_no" />
                  <Label htmlFor="dw_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="couldnt_see_doctor">Couldn't See Doctor Due to Cost</Label>
              <RadioGroup
                value={watchedValues.couldnt_see_doctor}
                onValueChange={(value) => setValue("couldnt_see_doctor", value)}
                disabled={disabled}
                aria-label="Couldn't see doctor selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="csd_yes" />
                  <Label htmlFor="csd_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="csd_no" />
                  <Label htmlFor="csd_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="has_healthcare">Has Any Form of Healthcare</Label>
              <RadioGroup
                value={watchedValues.has_healthcare}
                onValueChange={(value) => setValue("has_healthcare", value)}
                disabled={disabled}
                aria-label="Has healthcare selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hh_yes" />
                  <Label htmlFor="hh_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hh_no" />
                  <Label htmlFor="hh_no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle and Behavioral Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Lifestyle and Behavioral Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smoked_100_cigarettes">Smoked 100 Cigarettes in Life</Label>
              <RadioGroup
                value={watchedValues.smoked_100_cigarettes}
                onValueChange={(value) => setValue("smoked_100_cigarettes", value)}
                disabled={disabled}
                aria-label="Smoked 100 cigarettes selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="smoke_yes" />
                  <Label htmlFor="smoke_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="smoke_no" />
                  <Label htmlFor="smoke_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heavy_alcohol">Heavy Alcohol Consumption</Label>
              <RadioGroup
                value={watchedValues.heavy_alcohol}
                onValueChange={(value) => setValue("heavy_alcohol", value)}
                disabled={disabled}
                aria-label="Heavy alcohol consumption selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="alcohol_yes" />
                  <Label htmlFor="alcohol_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="alcohol_no" />
                  <Label htmlFor="alcohol_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="physical_activity">Physical Activity (last 30 days)</Label>
              <RadioGroup
                value={watchedValues.physical_activity}
                onValueChange={(value) => setValue("physical_activity", value)}
                disabled={disabled}
                aria-label="Physical activity selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pa_yes" />
                  <Label htmlFor="pa_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pa_no" />
                  <Label htmlFor="pa_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fruit_consumption">Fruit Consumption (servings/day)</Label>
              <Input
                id="fruit_consumption"
                type="number"
                min="0"
                max="10"
                step="0.5"
                placeholder="e.g., 2.5"
                {...register("fruit_consumption", {
                  required: "Fruit consumption is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 10, message: "Maximum 10 servings" }
                })}
                disabled={disabled}
                className={hideNumberInputSpinners}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 2-4 servings per day
              </p>
              {errors.fruit_consumption && (
                <p className="text-sm text-destructive">{errors.fruit_consumption.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vegetable_consumption">Vegetable Consumption (servings/day)</Label>
              <Input
                id="vegetable_consumption"
                type="number"
                min="0"
                max="10"
                step="0.5"
                placeholder="e.g., 3.0"
                {...register("vegetable_consumption", {
                  required: "Vegetable consumption is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 10, message: "Maximum 10 servings" }
                })}
                disabled={disabled}
                className={hideNumberInputSpinners}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 3-5 servings per day
              </p>
              {errors.vegetable_consumption && (
                <p className="text-sm text-destructive">{errors.vegetable_consumption.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mental and Physical Health Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Mental and Physical Health Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="poor_mental_health">Days of Poor Mental Health (last 30)</Label>
              <Input
                id="poor_mental_health"
                type="number"
                min="0"
                max="30"
                placeholder="e.g., 5"
                {...register("poor_mental_health", {
                  required: "Mental health days is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 30, message: "Maximum 30 days" }
                })}
                disabled={disabled}
                className={hideNumberInputSpinners}
              />
              <p className="text-xs text-muted-foreground">
                Days when mental health was not good
              </p>
              {errors.poor_mental_health && (
                <p className="text-sm text-destructive">{errors.poor_mental_health.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="poor_physical_health">Days of Poor Physical Health (last 30)</Label>
              <Input
                id="poor_physical_health"
                type="number"
                min="0"
                max="30"
                placeholder="e.g., 3"
                {...register("poor_physical_health", {
                  required: "Physical health days is required",
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 30, message: "Maximum 30 days" }
                })}
                disabled={disabled}
                className={hideNumberInputSpinners}
              />
              <p className="text-xs text-muted-foreground">
                Days when physical health was not good
              </p>
              {errors.poor_physical_health && (
                <p className="text-sm text-destructive">{errors.poor_physical_health.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="history_stroke">History of Stroke</Label>
              <RadioGroup
                value={watchedValues.history_stroke}
                onValueChange={(value) => setValue("history_stroke", value)}
                disabled={disabled}
                aria-label="History of stroke selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="stroke_yes" />
                  <Label htmlFor="stroke_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="stroke_no" />
                  <Label htmlFor="stroke_no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="history_heart_disease">History of Heart Disease or Heart Attack</Label>
              <RadioGroup
                value={watchedValues.history_heart_disease}
                onValueChange={(value) => setValue("history_heart_disease", value)}
                disabled={disabled}
                aria-label="History of heart disease selection"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="heart_yes" />
                  <Label htmlFor="heart_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="heart_no" />
                  <Label htmlFor="heart_no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

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