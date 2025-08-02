import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FormData } from "@/pages/DiabetesRisk";
import { Loader2, HelpCircle } from "lucide-react";

interface DiabetesRiskFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function DiabetesRiskForm({ form, onSubmit, isLoading, disabled }: DiabetesRiskFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  const watchedValues = watch();

  const handleRadioChange = (field: keyof FormData, value: number) => {
    setValue(field, value, { shouldValidate: true });
  };

  const handleNumberChange = (field: keyof FormData, value: string) => {
    const numValue = value === '' ? null : Number(value);
    setValue(field, numValue, { shouldValidate: true });
  };

  const renderRadioGroup = (field: keyof FormData, label: string, options: {value: number, label: string}[]) => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-foreground">{label}</legend>
      <RadioGroup
        value={watchedValues[field]?.toString() || ''}
        onValueChange={(value) => handleRadioChange(field, Number(value))}
        disabled={disabled}
        className="flex flex-wrap gap-6"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option.value.toString()} 
              id={`${field}_${option.value}`}
              className="focus:ring-2 focus:ring-primary"
            />
            <Label 
              htmlFor={`${field}_${option.value}`}
              className="cursor-pointer text-sm hover:text-foreground transition-colors"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  );

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Demographics */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</span>
            Demographics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age-select">Age Group</Label>
              <Select
                value={watchedValues.Age?.toString() || ''}
                onValueChange={(value) => setValue("Age", Number(value))}
                disabled={disabled}
                name="age"
              >
                <SelectTrigger id="age-select" className="focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select your age group" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age === 1 ? '18-24 years' : age === 13 ? '80+ years' : `${age*5+15}-${age*5+19} years`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sex */}
            {renderRadioGroup('Sex', 'Sex', [
              {value: 0, label: 'Female'},
              {value: 1, label: 'Male'}
            ])}

            {/* Education */}
            <div className="space-y-2">
              <Label htmlFor="education-select">Education Level</Label>
              <Select
                value={watchedValues.Education?.toString() || ''}
                onValueChange={(value) => setValue("Education", Number(value))}
                disabled={disabled}
                name="education"
              >
                <SelectTrigger id="education-select" className="focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map((edu) => (
                    <SelectItem key={edu} value={edu.toString()}>
                      {edu === 1 ? 'Never attended school' :
                       edu === 2 ? 'Elementary school' :
                       edu === 3 ? 'Some high school' :
                       edu === 4 ? 'High school graduate' :
                       edu === 5 ? 'Some college/university' : 'College/university graduate'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Income */}
            <div className="space-y-2">
              <Label htmlFor="income-select">Annual Household Income</Label>
              <Select
                value={watchedValues.Income?.toString() || ''}
                onValueChange={(value) => setValue("Income", Number(value))}
                disabled={disabled}
                name="income"
              >
                <SelectTrigger id="income-select" className="focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select your income range" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    {value:1,label:'Less than $15,000'},
                    {value:2,label:'$15,000 – $24,999'},
                    {value:3,label:'$25,000 – $34,999'},
                    {value:4,label:'$35,000 – $49,999'},
                    {value:5,label:'$50,000 – $74,999'},
                    {value:6,label:'$75,000 or more'}
                  ].map(opt => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</span>
            Health Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BMI */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="bmi-input">BMI</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full p-1 hover:bg-muted transition-colors"
                      aria-label="BMI calculation help"
                      tabIndex={0}
                    >
                      <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm p-4" role="tooltip">
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">BMI Calculation Formula:</p>
                      <p className="text-sm">BMI = Weight (kg) ÷ [Height (m)]²</p>
                      <div className="border-t pt-2">
                        <p className="text-xs text-muted-foreground">
                          <strong>Example:</strong><br />
                          Weight: 70kg, Height: 1.75m<br />
                          BMI = 70 ÷ (1.75)² = 22.9
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="bmi-input"
                type="number"
                step="0.1"
                min="10"
                max="70"
                value={watchedValues.BMI || ''}
                onChange={(e) => handleNumberChange("BMI", e.target.value)}
                disabled={disabled}
                placeholder="Enter your BMI (e.g., 24.5)"
                aria-describedby="bmi-help"
                className="focus:ring-2 focus:ring-primary"
              />
              <p id="bmi-help" className="text-xs text-muted-foreground">
                Don't know your BMI? Click the ? icon for the calculation formula
              </p>
            </div>

            {/* General Health */}
            <div className="space-y-2">
              <Label htmlFor="health-select">General Health Rating</Label>
              <Select
                value={watchedValues.GenHlth?.toString() || ''}
                onValueChange={(value) => setValue("GenHlth", Number(value))}
                disabled={disabled}
                name="general-health"
              >
                <SelectTrigger id="health-select" className="focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Rate your general health" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map((health) => (
                    <SelectItem key={health} value={health.toString()}>
                      {health} - {['','Excellent','Very Good','Good','Fair','Poor'][health]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mental Health Days */}
            <div className="space-y-2">
              <Label htmlFor="mental-health">Poor Mental Health Days</Label>
              <Input
                id="mental-health"
                type="number"
                min="0"
                max="30"
                value={watchedValues.MentHlth || ''}
                onChange={(e) => handleNumberChange("MentHlth", e.target.value)}
                disabled={disabled}
                placeholder="0-30 days"
                aria-describedby="mental-health-help"
                className="focus:ring-2 focus:ring-primary"
              />
              <p id="mental-health-help" className="text-xs text-muted-foreground">
                Days in the past 30 days when your mental health was not good
              </p>
            </div>

            {/* Physical Health Days */}
            <div className="space-y-2">
              <Label htmlFor="physical-health">Poor Physical Health Days</Label>
              <Input
                id="physical-health"
                type="number"
                min="0"
                max="30"
                value={watchedValues.PhysHlth || ''}
                onChange={(e) => handleNumberChange("PhysHlth", e.target.value)}
                disabled={disabled}
                placeholder="0-30 days"
                aria-describedby="physical-health-help"
                className="focus:ring-2 focus:ring-primary"
              />
              <p id="physical-health-help" className="text-xs text-muted-foreground">
                Days in the past 30 days when your physical health was not good
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Conditions */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</span>
            Health Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {field: 'HighBP', label: 'High Blood Pressure'},
              {field: 'HighChol', label: 'High Cholesterol'},
              {field: 'CholCheck', label: 'Cholesterol Check in 5 Years'},
              {field: 'Stroke', label: 'Had a Stroke'},
              {field: 'HeartDiseaseorAttack', label: 'Heart Disease/Attack'},
              {field: 'DiffWalk', label: 'Difficulty Walking'},
              {field: 'Smoker', label: 'Smoker (100+ cigarettes)'},
              {field: 'PhysActivity', label: 'Physical Activity'},
              {field: 'Fruits', label: 'Daily Fruits'},
              {field: 'Veggies', label: 'Daily Vegetables'},
              {field: 'HvyAlcoholConsump', label: 'Heavy Alcohol Use'},
              {field: 'AnyHealthcare', label: 'Has Healthcare'},
              {field: 'NoDocbcCost', label: 'Couldn\'t Afford Doctor'}
            ].map(({field, label}) => (
              <fieldset key={field} className="space-y-3">
                <legend className="text-sm font-medium text-foreground">{label}</legend>
                <div className="flex gap-6" role="radiogroup" aria-labelledby={`${field}-legend`}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${field}_no`}
                      name={field}
                      checked={watchedValues[field as keyof FormData] === 0}
                      onChange={() => handleRadioChange(field as keyof FormData, 0)}
                      disabled={disabled}
                      className="h-4 w-4 text-primary focus:ring-2 focus:ring-primary border-gray-300"
                    />
                    <Label 
                      htmlFor={`${field}_no`}
                      className="cursor-pointer text-sm hover:text-foreground transition-colors"
                    >
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${field}_yes`}
                      name={field}
                      checked={watchedValues[field as keyof FormData] === 1}
                      onChange={() => handleRadioChange(field as keyof FormData, 1)}
                      disabled={disabled}
                      className="h-4 w-4 text-primary focus:ring-2 focus:ring-primary border-gray-300"
                    />
                    <Label 
                      htmlFor={`${field}_yes`}
                      className="cursor-pointer text-sm hover:text-foreground transition-colors"
                    >
                      Yes
                    </Label>
                  </div>
                </div>
              </fieldset>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-6">
        <Button 
          type="submit" 
          disabled={isLoading || disabled}
          size="lg"
          className="min-w-[200px] focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Analyzing...</span>
            </>
          ) : (
            'Get Diabetes Risk Assessment'
          )}
        </Button>
      </div>
    </form>
    </TooltipProvider>
  );
}
