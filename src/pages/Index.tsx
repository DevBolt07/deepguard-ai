import BottomTabBar from "@/components/BottomTabBar";
import ScanResultModal from "@/components/ScanResultModal";
import { Shield, Copy, ArrowRight, Image, Video, Link2, Mic, Upload } from "lucide-react";
import { useState, useRef, useCallback, DragEvent } from "react";
import { scanLink, scanImage, scanVideo, scanAudio, ScanResult, ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type ScanType = "link" | "image" | "video" | "audio";
type DragTarget = "image" | "video" | "audio" | null;

const Index = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [lastScanType, setLastScanType] = useState<ScanType | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<DragTarget>(null);
  const { toast } = useToast();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handlePasteLink = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      console.log("[UI] Pasted URL:", text);
    } catch (err) {
      toast({
        title: "Clipboard access denied",
        description: "Please paste the URL manually",
        variant: "destructive",
      });
    }
  };

  const performScan = useCallback(async (type: ScanType, file?: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsNetworkError(false);
    setIsModalOpen(true);
    setLastScanType(type);
    if (file) setLastFile(file);

    console.log(`[Scan] Starting ${type} scan...`);

    try {
      let scanResult: ScanResult;
      
      switch (type) {
        case "link":
          scanResult = await scanLink(url);
          break;
        case "image":
          if (!file) throw new Error("No file provided");
          scanResult = await scanImage(file);
          break;
        case "video":
          if (!file) throw new Error("No file provided");
          scanResult = await scanVideo(file);
          break;
        case "audio":
          if (!file) throw new Error("No file provided");
          scanResult = await scanAudio(file);
          break;
      }
      
      setResult(scanResult);
      console.log(`[Scan] ${type} scan completed successfully`);
    } catch (err) {
      const isNetwork = err instanceof ApiError && err.isNetworkError;
      setIsNetworkError(isNetwork);
      setError(err instanceof Error ? err.message : "Failed to analyze");
      console.error(`[Scan] ${type} scan failed:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const handleRetry = useCallback(() => {
    if (!lastScanType) return;
    
    console.log(`[Retry] Retrying ${lastScanType} scan...`);
    
    if (lastScanType === "link") {
      performScan("link");
    } else if (lastFile) {
      performScan(lastScanType, lastFile);
    }
  }, [lastScanType, lastFile, performScan]);

  const handleAnalyzeLink = () => {
    if (!url.trim()) return;
    performScan("link");
  };

  const validateAndProcessFile = useCallback((file: File, type: "image" | "video" | "audio") => {
    const validations = {
      image: { pattern: /\.(jpg|jpeg|png|webp)$/i, formats: "JPG, PNG, or WEBP" },
      video: { pattern: /\.(mp4|mov|avi)$/i, formats: "MP4, MOV, or AVI" },
      audio: { pattern: /\.(mp3|wav|m4a|aac|ogg)$/i, formats: "MP3, WAV, M4A, AAC, or OGG" },
    };

    const { pattern, formats } = validations[type];
    
    if (!file.name.toLowerCase().match(pattern)) {
      toast({ title: "Invalid format", description: `Please upload ${formats}`, variant: "destructive" });
      return false;
    }

    console.log(`[Upload] ${type} selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    performScan(type, file);
    return true;
  }, [performScan, toast]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndProcessFile(file, "image");
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndProcessFile(file, "video");
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndProcessFile(file, "audio");
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, target: DragTarget) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(target);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, type: "image" | "video" | "audio") => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(null);

    const file = e.dataTransfer.files?.[0];
    if (!file) {
      toast({ title: "No file detected", description: "Please drop a valid file", variant: "destructive" });
      return;
    }

    console.log(`[Drop] File dropped on ${type} zone: ${file.name}`);
    validateAndProcessFile(file, type);
  };

  const getDropZoneClasses = (type: DragTarget) => {
    const baseClasses = "glass-card p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200";
    const isActive = dragOver === type;
    
    if (isActive) {
      return `${baseClasses} border-2 border-dashed border-primary bg-primary/10 scale-105`;
    }
    
    const hoverClasses = {
      image: "hover:border-primary/30",
      video: "hover:border-success/30",
      audio: "hover:border-warning/30",
    };
    
    return `${baseClasses} ${type ? hoverClasses[type] : ""}`;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hidden file inputs */}
      <input ref={imageInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={handleImageUpload} />
      <input ref={videoInputRef} type="file" accept=".mp4,.mov,.avi" className="hidden" onChange={handleVideoUpload} />
      <input ref={audioInputRef} type="file" accept=".mp3,.wav,.m4a,.aac,.ogg" className="hidden" onChange={handleAudioUpload} />

      {/* Header */}
      <div className="px-4 pt-12 pb-6 flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Home</h1>
      </div>

      {/* Main Paste Link Card */}
      <div className="px-4 mb-6">
        <div className="rounded-3xl bg-gradient-to-br from-accent to-accent/70 p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
            <Link2 className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Paste Link to Analyze</h2>
          <p className="text-sm text-white/70 mb-4">YouTube, Instagram, TikTok, Facebook & more</p>
          
          <div className="mb-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste URL here..."
              className="w-full py-3 px-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handlePasteLink}
              className="flex-1 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center gap-2 text-white font-medium hover:bg-white/30 transition-colors"
            >
              <Copy className="h-5 w-5" />
              Paste
            </button>
            <button
              onClick={handleAnalyzeLink}
              disabled={!url.trim() || isLoading}
              className="flex-1 py-3 rounded-xl bg-white text-accent font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Or Upload Directly */}
      <div className="px-4">
        <p className="text-center text-muted-foreground text-sm mb-4">Or drag & drop files below</p>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Image Drop Zone */}
          <div
            onClick={() => imageInputRef.current?.click()}
            onDragOver={(e) => handleDragOver(e, "image")}
            onDragEnter={(e) => handleDragOver(e, "image")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "image")}
            className={getDropZoneClasses("image")}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              {dragOver === "image" ? (
                <Upload className="h-5 w-5 text-primary animate-bounce" />
              ) : (
                <Image className="h-5 w-5 text-primary" />
              )}
            </div>
            <span className="text-xs font-medium text-foreground">
              {dragOver === "image" ? "Drop here" : "Image"}
            </span>
            <span className="text-[10px] text-muted-foreground">JPG, PNG, WEBP</span>
          </div>
          
          {/* Video Drop Zone */}
          <div
            onClick={() => videoInputRef.current?.click()}
            onDragOver={(e) => handleDragOver(e, "video")}
            onDragEnter={(e) => handleDragOver(e, "video")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "video")}
            className={getDropZoneClasses("video")}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              {dragOver === "video" ? (
                <Upload className="h-5 w-5 text-success animate-bounce" />
              ) : (
                <Video className="h-5 w-5 text-success" />
              )}
            </div>
            <span className="text-xs font-medium text-foreground">
              {dragOver === "video" ? "Drop here" : "Video"}
            </span>
            <span className="text-[10px] text-muted-foreground">MP4, MOV, AVI</span>
          </div>

          {/* Audio Drop Zone */}
          <div
            onClick={() => audioInputRef.current?.click()}
            onDragOver={(e) => handleDragOver(e, "audio")}
            onDragEnter={(e) => handleDragOver(e, "audio")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "audio")}
            className={getDropZoneClasses("audio")}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              {dragOver === "audio" ? (
                <Upload className="h-5 w-5 text-warning animate-bounce" />
              ) : (
                <Mic className="h-5 w-5 text-warning" />
              )}
            </div>
            <span className="text-xs font-medium text-foreground">
              {dragOver === "audio" ? "Drop here" : "Audio"}
            </span>
            <span className="text-[10px] text-muted-foreground">MP3, WAV, M4A</span>
          </div>
        </div>
      </div>

      <ScanResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        result={result}
        error={error}
        onRetry={handleRetry}
        isNetworkError={isNetworkError}
      />

      <BottomTabBar />
    </div>
  );
};

export default Index;
