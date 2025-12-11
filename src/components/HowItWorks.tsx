import { Upload, Brain, FileCheck, ShieldCheck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Media",
      description: "Paste a URL or upload an image, video, or audio file directly.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our neural networks scan for manipulation artifacts and anomalies.",
    },
    {
      icon: FileCheck,
      title: "Get Results",
      description: "Receive a detailed forensic breakdown with confidence scores.",
    },
    {
      icon: ShieldCheck,
      title: "Stay Protected",
      description: "Make informed decisions and report confirmed deepfakes.",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(187_85%_53%_/_0.05)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How <span className="gradient-text">DeepGuard</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our advanced detection pipeline combines multiple AI models to provide the most accurate analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="glass-card p-6 text-center group hover:border-primary/30 transition-all">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
