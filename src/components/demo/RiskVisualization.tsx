import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RiskVisualizationProps {
  riskScore: number;
}

export function RiskVisualization({ riskScore }: RiskVisualizationProps) {
  const percentage = Math.round(riskScore * 100);
  const remaining = 100 - percentage;

  const data = [
    { name: "Risk", value: percentage },
    { name: "Safe", value: remaining }
  ];

  const getRiskColor = (score: number) => {
    if (score < 30) return "#16a34a"; // success
    if (score < 70) return "#ea580c"; // warning
    return "#dc2626"; // danger
  };

  const COLORS = [getRiskColor(percentage), "#e5e7eb"];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{percentage}%</div>
          <div className="text-sm text-muted-foreground">Risk Score</div>
        </div>
      </div>
    </div>
  );
}