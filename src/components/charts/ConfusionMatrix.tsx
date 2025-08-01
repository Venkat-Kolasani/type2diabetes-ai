import { cn } from "@/lib/utils";

const matrix = [
  [{ value: 22731, label: "TN" }, { value: 594, label: "FP" }],
  [{ value: 3434, label: "FN" }, { value: 778, label: "TP" }]
];

export function ConfusionMatrix() {
  const getIntensity = (value: number) => {
    const max = Math.max(...matrix.flat().map(cell => cell.value));
    return value / max;
  };

  const getCellColor = (value: number, label: string) => {
    const intensity = getIntensity(value);
    const isCorrect = label === "TP" || label === "TN";
    
    if (isCorrect) {
      return `bg-success/20 border-success/30`;
    } else {
      return `bg-danger/20 border-danger/30`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {matrix.map((row, i) => 
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={cn(
                "p-6 rounded-lg border-2 text-center transition-all",
                getCellColor(cell.value, cell.label)
              )}
            >
              <div className="text-2xl font-bold text-foreground">{cell.value}</div>
              <div className="text-sm text-muted-foreground">{cell.label}</div>
            </div>
          ))
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center text-sm">
        <div>
          <div className="font-medium text-foreground">Predicted</div>
          <div className="text-muted-foreground">Negative | Positive</div>
        </div>
        <div>
          <div className="font-medium text-foreground">Actual</div>
          <div className="text-muted-foreground">Negative | Positive</div>
        </div>
      </div>

     
    </div>
  );
}