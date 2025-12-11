import BottomTabBar from "@/components/BottomTabBar";
import { Shield, Copy, ArrowRight, Image, Video } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [url, setUrl] = useState("");

  const handlePasteLink = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.log("Failed to read clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Home</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30">
          <span className="text-xs text-accent">✦ 5 credits</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-accent">Subscribe</span>
        </div>
      </div>

      {/* Main Paste Link Card */}
      <div className="px-4 mb-6">
        <div className="rounded-3xl bg-gradient-to-br from-accent to-accent/70 p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
            <Copy className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Paste Link to Analyze</h2>
          <p className="text-sm text-white/70 mb-6">Or share directly from social media apps</p>
          
          <button
            onClick={handlePasteLink}
            className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center gap-2 text-white font-medium hover:bg-white/30 transition-colors"
          >
            <Copy className="h-5 w-5" />
            Paste Link
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {["X", "YouTube", "Instagram", "Facebook", "TikTok"].map((platform) => (
              <div
                key={platform}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >
                <span className="text-white text-xs font-medium">
                  {platform[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Or Upload Directly */}
      <div className="px-4">
        <p className="text-center text-muted-foreground text-sm mb-4">Or upload directly</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Image className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Upload Image</span>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-success/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Video className="h-6 w-6 text-success" />
            </div>
            <span className="text-sm font-medium text-foreground">Upload Video</span>
          </div>
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
};

export default Index;
