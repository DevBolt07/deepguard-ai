import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScanResult, getProbabilityColor, ApiError } from "@/lib/api";
import { ShieldCheck, ShieldAlert, ShieldX, Loader2, RefreshCw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: ScanResult | null;
  error: string | null;
  onRetry?: () => void;
  isNetworkError?: boolean;
}

const ScanResultModal = ({ isOpen, onClose, isLoading, result, error, onRetry, isNetworkError }: ScanResultModalProps) => {
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
            {isLoading ? "Analyzing..." : error ? "Error" : "Scan Results"}
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
            {isNetworkError ? (
              <WifiOff className="h-16 w-16 text-destructive" />
            ) : (
              <ShieldX className="h-16 w-16 text-destructive" />
            )}
            <p className="text-destructive font-medium">
              {isNetworkError ? "Connection Failed" : "Analysis Failed"}
            </p>
            <p className="text-sm text-muted-foreground text-center px-4">{error}</p>
            
            {onRetry && (
              <Button 
                onClick={onRetry} 
                variant="outline" 
                className="mt-2 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            
            {isNetworkError && (
              <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                <p className="font-medium mb-1">Troubleshooting:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensure backend is running on localhost:8000</li>
                  <li>Check your terminal for server errors</li>
                  <li>Run: python -m uvicorn app.main:app --reload</li>
                </ul>
              </div>
            )}
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
