const data = [
  { feature: "HbA1c", importance: 8.25, displayName: "HbA1c" },
  { feature: "Glucose", importance: 6.70, displayName: "Glucose" },
  { feature: "BMI", importance: 5.30, displayName: "BMI" },
  { feature: "Age", importance: 4.30, displayName: "Age" },
  { feature: "Family History", importance: 3.15, displayName: "Family History" },
  { feature: "Blood Pressure", importance: 2.50, displayName: "Blood Pressure" },
  { feature: "Cholesterol", importance: 1.80 , displayName: "Cholesterol" },
  { feature: "Triglycerides", importance: 1.65, displayName: "Triglycerides" },
  { feature: "Activity Level", importance: 1.40, displayName: "Activity Level" },
  { feature: "Smoking", importance: 0.90, displayName: "Smoking" }
];

export function FeatureImportance() {
  const maxImportance = Math.max(...data.map(d => d.importance));
  
  return (
    <div className="h-80 flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
            {/* Rank Number */}
            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{index + 1}</span>
            </div>
            
            {/* Feature Name */}
            <div className="flex-shrink-0 w-24 text-xs font-medium text-foreground">
              {item.displayName}
            </div>
            
            {/* Progress Bar */}
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${(item.importance / maxImportance) * 100}%`,
                    minWidth: '4px'
                  }}
                />
              </div>
              
              {/* Percentage */}
              <div className="flex-shrink-0 w-10 text-right">
                <span className="text-xs font-semibold text-primary">
                  {item.importance.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-border/50">
        <div className="text-xs text-muted-foreground text-center">
          Feature importance based on SHAP values from LightGBM model
        </div>
      </div>
    </div>
  );
}