import BottomTabBar from "@/components/BottomTabBar";
import ScanResultModal from "@/components/ScanResultModal";
import { Shield, Copy, ArrowRight, Image, Video, Link2, Mic } from "lucide-react";
import { useState, useRef } from "react";
import { scanLink, scanImage, scanVideo, scanAudio, ScanResult } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handlePasteLink = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      toast({
        title: "Clipboard access denied",
        description: "Please paste the URL manually",
        variant: "destructive",
      });
    }
  };

  const handleAnalyzeLink = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsModalOpen(true);

    try {
      const scanResult = await scanLink(url);
      setResult(scanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/)) {
      toast({ title: "Invalid format", description: "Please upload JPG, PNG, or WEBP", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsModalOpen(true);

    try {
      const scanResult = await scanImage(file);
      setResult(scanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scan image");
    } finally {
      setIsLoading(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().match(/\.(mp4|mov|avi)$/)) {
      toast({ title: "Invalid format", description: "Please upload MP4, MOV, or AVI", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsModalOpen(true);

    try {
      const scanResult = await scanVideo(file);
      setResult(scanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scan video");
    } finally {
      setIsLoading(false);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().match(/\.(mp3|wav|m4a|aac|ogg)$/)) {
      toast({ title: "Invalid format", description: "Please upload MP3, WAV, M4A, AAC, or OGG", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsModalOpen(true);

    try {
      const scanResult = await scanAudio(file);
      setResult(scanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to scan audio");
    } finally {
      setIsLoading(false);
      if (audioInputRef.current) audioInputRef.current.value = "";
    }
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
        <p className="text-center text-muted-foreground text-sm mb-4">Or upload directly</p>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => imageInputRef.current?.click()}
            className="glass-card p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Image className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-foreground">Image</span>
          </button>
          
          <button
            onClick={() => videoInputRef.current?.click()}
            className="glass-card p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-success/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Video className="h-5 w-5 text-success" />
            </div>
            <span className="text-xs font-medium text-foreground">Video</span>
          </button>

          <button
            onClick={() => audioInputRef.current?.click()}
            className="glass-card p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-warning/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Mic className="h-5 w-5 text-warning" />
            </div>
            <span className="text-xs font-medium text-foreground">Audio</span>
          </button>
        </div>
      </div>

      <ScanResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        result={result}
        error={error}
      />

      <BottomTabBar />
    </div>
  );
};

export default Index;
