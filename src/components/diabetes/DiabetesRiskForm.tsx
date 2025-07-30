import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/pages/DiabetesRisk";
import { Loader2 } from "lucide-react";

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
    <div className="space-y-2">
      <Label>{label}</Label>
      <RadioGroup
        value={watchedValues[field]?.toString() || ''}
        onValueChange={(value) => handleRadioChange(field, Number(value))}
        disabled={disabled}
      >
        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`${field}_${option.value}`} />
              <Label htmlFor={`${field}_${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Demographics */}
      <Card>
        <CardHeader><CardTitle>Demographics</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="Age">Age Group</Label>
              <Select
                value={watchedValues.Age?.toString() || ''}
                onValueChange={(value) => setValue("Age", Number(value))}
                disabled={disabled}
              >
                <SelectTrigger><SelectValue placeholder="Select age" /></SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age === 1 ? '18-24' : age === 13 ? '80+' : `${age*5+15}-${age*5+19}`}
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
              <Label>Education Level</Label>
              <Select
                value={watchedValues.Education?.toString() || ''}
                onValueChange={(value) => setValue("Education", Number(value))}
                disabled={disabled}
              >
                <SelectTrigger><SelectValue placeholder="Select education" /></SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map((edu) => (
                    <SelectItem key={edu} value={edu.toString()}>
                      {edu === 1 ? 'Never attended' :
                       edu === 2 ? 'Elementary' :
                       edu === 3 ? 'Some high school' :
                       edu === 4 ? 'High school' :
                       edu === 5 ? 'Some college' : 'College graduate'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Income */}
            <div className="space-y-2">
              <Label>Income Level</Label>
              <Select
                value={watchedValues.Income?.toString() || ''}
                onValueChange={(value) => setValue("Income", Number(value))}
                disabled={disabled}
              >
                <SelectTrigger><SelectValue placeholder="Select income" /></SelectTrigger>
                <SelectContent>
                  {[
                    {value:1,label:'< 15,000'},
                    {value:2,label:'15,000 – 24,999'},
                    {value:3,label:'25,000 – 34,999'},
                    {value:4,label:'35,000 – 49,999'},
                    {value:5,label:'50,000 – 74,999'},
                    {value:6,label:'75,000+'}
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
      <Card>
        <CardHeader><CardTitle>Health Metrics</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BMI */}
            <div className="space-y-2">
              <Label>BMI</Label>
              <Input
                type="number"
                step="0.1"
                min="10"
                max="70"
                value={watchedValues.BMI || ''}
                onChange={(e) => handleNumberChange("BMI", e.target.value)}
                disabled={disabled}
                placeholder="e.g., 24.5"
              />
            </div>

            {/* General Health */}
            <div className="space-y-2">
              <Label>General Health (1-5)</Label>
              <Select
                value={watchedValues.GenHlth?.toString() || ''}
                onValueChange={(value) => setValue("GenHlth", Number(value))}
                disabled={disabled}
              >
                <SelectTrigger><SelectValue placeholder="Select health" /></SelectTrigger>
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
              <Label>Poor Mental Health Days (0-30)</Label>
              <Input
                type="number"
                min="0"
                max="30"
                value={watchedValues.MentHlth || ''}
                onChange={(e) => handleNumberChange("MentHlth", e.target.value)}
                disabled={disabled}
              />
            </div>

            {/* Physical Health Days */}
            <div className="space-y-2">
              <Label>Poor Physical Health Days (0-30)</Label>
              <Input
                type="number"
                min="0"
                max="30"
                value={watchedValues.PhysHlth || ''}
                onChange={(e) => handleNumberChange("PhysHlth", e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Conditions */}
      <Card>
        <CardHeader><CardTitle>Health Conditions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
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
              <div key={field} className="space-y-2">
                <Label>{label}</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${field}_no`}
                      name={field}
                      checked={watchedValues[field as keyof FormData] === 0}
                      onChange={() => handleRadioChange(field as keyof FormData, 0)}
                      disabled={disabled}
                      className="h-4 w-4"
                    />
                    <Label htmlFor={`${field}_no`}>No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${field}_yes`}
                      name={field}
                      checked={watchedValues[field as keyof FormData] === 1}
                      onChange={() => handleRadioChange(field as keyof FormData, 1)}
                      disabled={disabled}
                      className="h-4 w-4"
                    />
                    <Label htmlFor={`${field}_yes`}>Yes</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading || disabled}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : 'Predict Diabetes Risk'}
        </Button>
      </div>
    </form>
  );
}
