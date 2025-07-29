const data = [
  { feature: "HbA1c", importance: 0.80 },
  { feature: "Glucose", importance: 0.75 },
  { feature: "BMI", importance: 0.70 },
  { feature: "Age", importance: 0.65 },
  { feature: "Family History", importance: 0.60 },
  { feature: "Blood Pressure", importance: 0.55 },
  { feature: "Cholesterol", importance: 0.50 },
  { feature: "Triglycerides", importance: 0.45 },
  { feature: "Activity Level", importance: 0.40 },
  { feature: "Smoking", importance: 0.35 }
];

export function FeatureImportance() {
  return (
    <div className="h-80 overflow-y-auto">
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">{index + 1}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{item.feature}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-muted rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${item.importance * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-primary min-w-[2.5rem]">
                {(item.importance * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <div className="text-xs text-muted-foreground">
          Feature importance based on SHAP values
        </div>
      </div>
    </div>
  );
}