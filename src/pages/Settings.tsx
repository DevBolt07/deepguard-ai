import Navbar from "@/components/Navbar";
import { User, Bell, Shield, Moon, Globe, HelpCircle } from "lucide-react";

const Settings = () => {
  const settingsSections = [
    {
      icon: User,
      title: "Account",
      description: "Manage your profile and preferences",
      items: ["Profile Information", "Email Preferences", "Connected Accounts"],
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control how you receive alerts",
      items: ["Push Notifications", "Email Alerts", "Weekly Reports"],
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Protect your data and account",
      items: ["Two-Factor Authentication", "Data Retention", "API Keys"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and application preferences
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {settingsSections.map((section, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-secondary">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                <div className="space-y-3 pl-16">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-foreground">{item}</span>
                      <span className="text-muted-foreground">→</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Dark Mode</span>
              <span className="ml-auto text-xs text-primary">Active</span>
            </button>
            <button className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Language</span>
              <span className="ml-auto text-xs text-muted-foreground">English</span>
            </button>
          </div>

          {/* Help */}
          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              Need help? Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
