import { useState } from "react";
import { Link2, ArrowRight, Youtube, Twitter, Instagram, Facebook } from "lucide-react";

interface URLScannerProps {
  onScan: (url: string) => void;
}

const URLScanner = ({ onScan }: URLScannerProps) => {
  const [url, setUrl] = useState("");

  const platforms = [
    { icon: Youtube, label: "YouTube" },
    { icon: Twitter, label: "X/Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Facebook, label: "Facebook" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onScan(url);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2 p-1 bg-secondary/50 rounded-xl border border-border/50 focus-within:border-primary/50 focus-within:shadow-[0_0_20px_hsl(187_85%_53%_/_0.1)] transition-all">
          <div className="pl-3">
            <Link2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL to analyze..."
            className="flex-1 bg-transparent px-2 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={!url.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Supported:</span>
        <div className="flex items-center gap-2">
          {platforms.map((platform) => (
            <div
              key={platform.label}
              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              title={platform.label}
            >
              <platform.icon className="h-4 w-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default URLScanner;
