import Navbar from "@/components/Navbar";
import { BookOpen, Video, Shield, AlertTriangle, CheckCircle, Brain, Eye, Ear } from "lucide-react";

const Education = () => {
  const modules = [
    {
      icon: Eye,
      title: "Spotting Visual Deepfakes",
      description: "Learn to identify facial inconsistencies, unnatural blinking, and lighting artifacts.",
      difficulty: "Beginner",
      duration: "10 min",
    },
    {
      icon: Ear,
      title: "Detecting Voice Clones",
      description: "Understand the subtle audio cues that reveal synthetic speech patterns.",
      difficulty: "Intermediate",
      duration: "15 min",
    },
    {
      icon: Brain,
      title: "AI Generation Artifacts",
      description: "Deep dive into how AI models leave digital fingerprints in generated content.",
      difficulty: "Advanced",
      duration: "25 min",
    },
    {
      icon: Shield,
      title: "Protecting Yourself",
      description: "Best practices for verifying content and avoiding AI-enabled scams.",
      difficulty: "Beginner",
      duration: "8 min",
    },
  ];

  const tips = [
    "Look for unnatural eye movements or blinking patterns",
    "Check for inconsistent lighting and shadows on the face",
    "Listen for robotic intonation or unnatural pauses in speech",
    "Verify sources through multiple independent channels",
    "Be skeptical of emotional or urgent content from unknown sources",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Learning Center</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Deepfake <span className="gradient-text">Education</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Arm yourself with knowledge to recognize and protect against AI-generated deception.
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {modules.map((module, index) => (
              <div
                key={index}
                className="glass-card p-6 group hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary/20 transition-colors">
                    <module.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                        {module.difficulty}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        {module.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <h2 className="text-xl font-semibold text-foreground">Quick Detection Tips</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
