import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.05, tpr: 0.32 },
  { fpr: 0.10, tpr: 0.55 },
  { fpr: 0.15, tpr: 0.72 },
  { fpr: 0.20, tpr: 0.80 },
  { fpr: 0.25, tpr: 0.83 },
  { fpr: 0.30, tpr: 0.86 },
  { fpr: 0.40, tpr: 0.89 },
  { fpr: 0.50, tpr: 0.91 },
  { fpr: 0.60, tpr: 0.93 },
  { fpr: 0.70, tpr: 0.95 },
  { fpr: 0.80, tpr: 0.97 },
  { fpr: 0.90, tpr: 0.99 },
  { fpr: 1.0, tpr: 1.0 }
];

export function ROCCurve() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="fpr"
            type="number"
            domain={[0, 1]}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            type="number"
            domain={[0, 1]}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]}
            labelFormatter={(label) => `FPR: ${(Number(label) * 100).toFixed(1)}%`}
          />
          <ReferenceLine 
            stroke="#94a3b8"
            strokeDasharray="5 5"
            segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]}
          />
          <Line 
            type="monotone"
            dataKey="tpr"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground">AUC = 0.96</div>
        <div className="text-xs text-muted-foreground">Excellent discrimination ability</div>
      </div>
    </div>
  );
}