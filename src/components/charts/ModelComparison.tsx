import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Ensemble", accuracy: 94.2, precision: 91.5, recall: 92.8, f1: 92.1 },
  { name: "XGBoost", accuracy: 92.8, precision: 89.2, recall: 90.1, f1: 89.6 },
  { name: "Random Forest", accuracy: 91.5, precision: 88.7, recall: 89.3, f1: 89.0 },
  { name: "Neural Network", accuracy: 89.3, precision: 86.1, recall: 87.2, f1: 86.6 },
  { name: "Logistic Regression", accuracy: 85.7, precision: 82.3, recall: 83.8, f1: 83.0 }
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
            domain={[75, 100]}
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
          <Bar 
            dataKey="precision"
            fill="hsl(var(--success))"
            radius={[4, 4, 0, 0]}
            name="Precision"
          />
          <Bar 
            dataKey="recall"
            fill="hsl(var(--warning))"
            radius={[4, 4, 0, 0]}
            name="Recall"
          />
          <Bar 
            dataKey="f1"
            fill="hsl(var(--danger))"
            radius={[4, 4, 0, 0]}
            name="F1-Score"
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