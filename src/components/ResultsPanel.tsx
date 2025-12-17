import { ShieldCheck, ShieldAlert, AlertTriangle, Eye, Waves, Fingerprint, Brain } from "lucide-react";

interface ResultsPanelProps {
  isAnalyzing?: boolean;
  result?: {
    score: number;
    findings: Array<{
      type: string;
      severity: "low" | "medium" | "high";
      description: string;
    }>;
  } | null;
}

const ResultsPanel = ({ isAnalyzing, result }: ResultsPanelProps) => {
  if (isAnalyzing) {
    return (
      <div className="glass-card p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-secondary animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing Content</h3>
          <p className="text-sm text-muted-foreground">
            Running deep forensic analysis...
          </p>
          <div className="flex gap-2 mt-4">
            {["Facial Analysis", "Audio Patterns", "Artifact Detection"].map((step) => (
              <span key={step} className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-card p-8">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-secondary mb-4">
            <Eye className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Analyze</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Select a scan type above and upload content to receive a detailed forensic analysis with manipulation probability scores.
          </p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-success";
    if (score < 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score < 30) return "bg-success/20";
    if (score < 70) return "bg-warning/20";
    return "bg-destructive/20";
  };

  const getScoreIcon = (score: number) => {
    if (score < 30) return ShieldCheck;
    if (score < 70) return AlertTriangle;
    return ShieldAlert;
  };

  const ScoreIcon = getScoreIcon(result.score);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-success bg-success/10 border-success/20";
      case "medium": return "text-warning bg-warning/10 border-warning/20";
      case "high": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-start gap-6">
        {/* Score Circle */}
        <div className="flex-shrink-0">
          <div className={`relative w-32 h-32 rounded-full ${getScoreBg(result.score)} flex items-center justify-center`}>
            <div className="text-center">
              <ScoreIcon className={`h-8 w-8 mx-auto mb-1 ${getScoreColor(result.score)}`} />
              <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}%
              </span>
              <p className="text-xs text-muted-foreground">Risk Score</p>
            </div>
          </div>
        </div>

        {/* Findings */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">Forensic Analysis</h3>
          <div className="space-y-3">
            {result.findings.map((finding, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border ${getSeverityColor(finding.severity)}`}
              >
                <Fingerprint className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{finding.type}</p>
                  <p className="text-xs opacity-80">{finding.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
