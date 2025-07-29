import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "HbA1c", importance: 8.25 },
  { name: "Glucose", importance: 6.70 },
  { name: "BMI", importance: 5.30 },
  { name: "Age", importance: 4.30 },
  { name: "Family History", importance: 3.15 },
  { name: "Blood Pressure", importance: 2.50 },
  { name: "Cholesterol", importance: 1.80 },
  { name: "Triglycerides", importance: 1.65 },
  { name: "Activity Level", importance: 1.40 },
  { name: "Smoking", importance: 0.90 }
];

export function FeatureImportance() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            domain={[0, 9]}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <YAxis 
            type="category"
            dataKey="name"
            width={100}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(1)}%`, "SHAP Importance"]}
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