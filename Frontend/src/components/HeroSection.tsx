import { Shield, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    { value: "500%", label: "Increase in deepfakes since 2023" },
    { value: "$25B", label: "Lost to AI-enabled fraud yearly" },
    { value: "96%", label: "Of people can't detect deepfakes" },
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(187_85%_53%_/_0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(262_83%_58%_/_0.1)_0%,transparent_50%)]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive mb-8">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">The Deepfake Crisis is Real</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Protect Yourself from</span>
            <br />
            <span className="gradient-text">AI-Generated Deception</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            DeepGuard AI uses advanced forensic analysis to detect deepfakes, voice clones, and synthetic media in seconds. Stay one step ahead of scammers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/scan"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(187_85%_53%_/_0.4)] glow-effect"
            >
              <Shield className="h-5 w-5" />
              Try for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 group hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-destructive" />
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Shield Animation */}
      <div className="absolute bottom-10 right-10 hidden lg:block opacity-20">
        <Shield className="h-48 w-48 text-primary animate-float" />
      </div>
    </div>
  );
};

export default HeroSection;
