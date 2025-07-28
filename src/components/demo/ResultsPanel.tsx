import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RiskVisualization } from "./RiskVisualization";
import { PredictionResult } from "@/pages/Demo";
import { 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Activity,
  Heart,
  Shield,
  AlertTriangle
} from "lucide-react";

interface ResultsPanelProps {
  result: PredictionResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "danger";
      default:
        return "primary";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-5 w-5" />;
      case "medium":
        return <AlertCircle className="h-5 w-5" />;
      case "high":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getDiabetesStatusInfo = (status: number) => {
    switch (status) {
      case 0:
        return {
          label: "No Diabetes",
          color: "success" as const,
          icon: <CheckCircle className="h-5 w-5" />,
          description: "No signs of diabetes detected"
        };
      case 1:
        return {
          label: "Pre-Diabetic",
          color: "warning" as const,
          icon: <AlertTriangle className="h-5 w-5" />,
          description: "Early warning signs detected - monitor closely"
        };
      case 2:
        return {
          label: "Diabetic",
          color: "danger" as const,
          icon: <AlertCircle className="h-5 w-5" />,
          description: "Diabetes indicators present - consult healthcare provider"
        };
      default:
        return {
          label: "Unknown",
          color: "secondary" as const,
          icon: <Target className="h-5 w-5" />,
          description: "Unable to determine status"
        };
    }
  };

  const diabetesStatus = getDiabetesStatusInfo(result.diabetes_status);

  return (
    <div className="space-y-6">
      {/* Diabetes Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Diabetes Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              {diabetesStatus.icon}
              <Badge
                variant={diabetesStatus.color}
                className="text-lg px-4 py-2"
              >
                {diabetesStatus.label}
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {diabetesStatus.description}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Risk Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <RiskVisualization riskScore={result.risk_score} />
            
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                {getRiskIcon(result.risk_level)}
                <Badge
                  variant={getRiskColor(result.risk_level) as any}
                  className="text-lg px-4 py-2"
                >
                  {result.risk_level.toUpperCase()} RISK
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Risk Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.timeline.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {item.years} year{item.years > 1 ? 's' : ''}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {(item.risk * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={item.risk * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Top Risk Factors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.top_factors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {index === 0 && <Heart className="h-4 w-4 text-danger" />}
                  {index === 1 && <Activity className="h-4 w-4 text-warning" />}
                  {index === 2 && <Shield className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.factor}</span>
                    <span className="text-sm text-muted-foreground">
                      {(factor.impact * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={factor.impact * 100}
                    className="h-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  {recommendation}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-warning">
                Important Disclaimer
              </p>
              <p className="text-sm text-muted-foreground">
                This assessment is for educational purposes only and should not replace 
                professional medical advice. Please consult with a healthcare provider 
                for proper medical evaluation and treatment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}