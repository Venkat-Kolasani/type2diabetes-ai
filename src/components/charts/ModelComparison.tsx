import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Ensemble", accuracy: 85.42 },
  { name: "XGBoost", accuracy: 84.95 },
  { name: "Random Forest", accuracy: 76.06 },
  { name: "Neural Network", accuracy: 73.05 },
  { name: "Logistic Regression", accuracy: 69.80 },
];

export function ModelComparison() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          <YAxis 
            domain={[65, 90]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`]}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px"
            }}
          />
          <Bar 
            dataKey="accuracy"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            name="Accuracy"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <div className="text-xs text-muted-foreground">
          Performance comparison across different algorithms
        </div>
      </div>
    </div>
  );
}