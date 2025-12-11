import { useState } from "react";
import { Link2, Image, Video, Mic, ShieldCheck, Lock, Zap } from "lucide-react";
import ScannerCard from "./ScannerCard";
import URLScanner from "./URLScanner";
import FileUploader from "./FileUploader";
import ResultsPanel from "./ResultsPanel";

type ScanType = "url" | "image" | "video" | "audio";

const Dashboard = () => {
  const [activeScan, setActiveScan] = useState<ScanType>("url");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    findings: Array<{ type: string; severity: "low" | "medium" | "high"; description: string }>;
  } | null>(null);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        score: Math.floor(Math.random() * 100),
        findings: [
          {
            type: "Facial Inconsistency",
            severity: "medium",
            description: "Minor lip-sync anomalies detected in frames 120-180",
          },
          {
            type: "Audio Artifacts",
            severity: "low",
            description: "Slight frequency irregularities in voice pattern",
          },
          {
            type: "Compression Analysis",
            severity: "high",
            description: "Multiple re-encoding artifacts suggest manipulation",
          },
        ],
      });
    }, 3000);
  };

  const scanners = [
    {
      id: "url" as const,
      icon: Link2,
      title: "URL Scanner",
      description: "Analyze content from YouTube, social media, and web links",
    },
    {
      id: "image" as const,
      icon: Image,
      title: "Image Upload",
      description: "Detect AI-generated or manipulated images",
    },
    {
      id: "video" as const,
      icon: Video,
      title: "Video Upload",
      description: "Deep analysis of video content for deepfakes",
    },
    {
      id: "audio" as const,
      icon: Mic,
      title: "Audio Upload",
      description: "Voice clone and synthetic speech detection",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">Media Scanner</h1>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
              Beta
            </span>
          </div>
          <p className="text-muted-foreground">
            Select a scan type below to analyze media for AI manipulation
          </p>
        </div>

        {/* Privacy Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="privacy-badge">
            <Lock className="h-3 w-3" />
            End-to-End Encrypted
          </div>
          <div className="privacy-badge">
            <ShieldCheck className="h-3 w-3" />
            No Data Stored
          </div>
          <div className="privacy-badge">
            <Zap className="h-3 w-3" />
            Real-time Analysis
          </div>
        </div>

        {/* Scanner Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {scanners.map((scanner) => (
            <ScannerCard
              key={scanner.id}
              icon={scanner.icon}
              title={scanner.title}
              description={scanner.description}
              isActive={activeScan === scanner.id}
              onClick={() => setActiveScan(scanner.id)}
            />
          ))}
        </div>

        {/* Active Scanner Interface */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            {activeScan === "url" && <Link2 className="h-5 w-5 text-primary" />}
            {activeScan === "image" && <Image className="h-5 w-5 text-primary" />}
            {activeScan === "video" && <Video className="h-5 w-5 text-primary" />}
            {activeScan === "audio" && <Mic className="h-5 w-5 text-primary" />}
            <h2 className="text-xl font-semibold text-foreground">
              {scanners.find((s) => s.id === activeScan)?.title}
            </h2>
          </div>

          {activeScan === "url" && <URLScanner onScan={simulateAnalysis} />}
          {activeScan === "image" && <FileUploader type="image" onUpload={simulateAnalysis} />}
          {activeScan === "video" && <FileUploader type="video" onUpload={simulateAnalysis} />}
          {activeScan === "audio" && <FileUploader type="audio" onUpload={simulateAnalysis} />}
        </div>

        {/* Results Panel */}
        <ResultsPanel isAnalyzing={isAnalyzing} result={result} />
      </div>
    </div>
  );
};

export default Dashboard;
