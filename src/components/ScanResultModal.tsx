import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScanResult, getProbabilityColor } from "@/lib/api";
import { ShieldCheck, ShieldAlert, ShieldX, Loader2 } from "lucide-react";

interface ScanResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: ScanResult | null;
  error: string | null;
}

const ScanResultModal = ({ isOpen, onClose, isLoading, result, error }: ScanResultModalProps) => {
  const probability = result?.deepfake_probability ?? result?.voice_clone_probability ?? 0;
  const colorType = getProbabilityColor(probability);
  
  const getColorClasses = () => {
    switch (colorType) {
      case "safe":
        return { bg: "bg-success/20", text: "text-success", border: "border-success" };
      case "suspicious":
        return { bg: "bg-warning/20", text: "text-warning", border: "border-warning" };
      case "danger":
        return { bg: "bg-destructive/20", text: "text-destructive", border: "border-destructive" };
    }
  };

  const getIcon = () => {
    if (colorType === "safe") return <ShieldCheck className="h-16 w-16 text-success" />;
    if (colorType === "suspicious") return <ShieldAlert className="h-16 w-16 text-warning" />;
    return <ShieldX className="h-16 w-16 text-destructive" />;
  };

  const getLabel = () => {
    if (colorType === "safe") return "Likely Authentic";
    if (colorType === "suspicious") return "Suspicious";
    return "Likely Deepfake";
  };

  const colors = getColorClasses();
  const breakdown = result?.model_breakdown || result?.details || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">
            {isLoading ? "Analyzing..." : "Scan Results"}
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex flex-col items-center py-8 gap-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <p className="text-muted-foreground">Running AI models...</p>
            <p className="text-sm text-muted-foreground/70">This may take a few seconds</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center py-8 gap-4">
            <ShieldX className="h-16 w-16 text-destructive" />
            <p className="text-destructive font-medium">Analysis Failed</p>
            <p className="text-sm text-muted-foreground text-center">{error}</p>
          </div>
        )}

        {result && !isLoading && !error && (
          <div className="flex flex-col items-center py-4 gap-6">
            {/* Main Score */}
            <div className={`w-full p-6 rounded-2xl ${colors.bg} border ${colors.border} flex flex-col items-center gap-3`}>
              {getIcon()}
              <p className={`text-4xl font-bold ${colors.text}`}>
                {Math.round(probability * 100)}%
              </p>
              <p className={`text-lg font-medium ${colors.text}`}>{getLabel()}</p>
            </div>

            {/* Media Type */}
            {result.media_type && (
              <p className="text-sm text-muted-foreground">
                Detected media type: <span className="text-foreground font-medium capitalize">{result.media_type}</span>
              </p>
            )}

            {/* Model Breakdown */}
            {Object.keys(breakdown).length > 0 && (
              <div className="w-full space-y-3">
                <p className="text-sm font-medium text-foreground">Model Breakdown</p>
                {Object.entries(breakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {Math.round(value * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScanResultModal;
