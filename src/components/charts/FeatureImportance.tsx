const data = [
  { feature: "BMI GenHlth", importance: 4.5, displayName: "BMI GenHlth" },
  { feature: "GenHlth Age", importance: 4.2, displayName: "GenHlth Age" },
  { feature: "Sex Age", importance: 4.0, displayName: "Sex Age" },
  { feature: "BMI PhysActivity", importance: 3.8, displayName: "BMI PhysActivity" },
  { feature: "GenHlth Income", importance: 3.7, displayName: "GenHlth Income" },
  { feature: "BMI", importance: 3.5, displayName: "BMI" },
  { feature: "BMI Fruits", importance: 3.5, displayName: "BMI Fruits" },
  { feature: "BMI Smoker", importance: 3.4, displayName: "BMI Smoker" },
  { feature: "GenHlth PhysHlth", importance: 3.3, displayName: "GenHlth PhysHlth" },
  { feature: "Fruits Age", importance: 3.0, displayName: "Fruits Age" }
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