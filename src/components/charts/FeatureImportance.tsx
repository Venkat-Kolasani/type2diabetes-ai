import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "HbA1c", importance: 1.0 },
  { name: "Glucose", importance: 0.85 },
  { name: "BMI", importance: 0.72 },
  { name: "Age", importance: 0.68 },
  { name: "Family History", importance: 0.55 },
  { name: "Blood Pressure", importance: 0.48 },
  { name: "Cholesterol", importance: 0.42 },
  { name: "Triglycerides", importance: 0.38 },
  { name: "Activity Level", importance: 0.32 },
  { name: "Smoking", importance: 0.28 }
];

export function FeatureImportance() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            domain={[0, 1]}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <YAxis 
            type="category"
            dataKey="name"
            width={100}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, "Importance"]}
          />
          <Bar 
            dataKey="importance"
            fill="hsl(var(--primary))"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <div className="text-xs text-muted-foreground">
          Feature importance based on SHAP values
        </div>
      </div>
    </div>
  );
}