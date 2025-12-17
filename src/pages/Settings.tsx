import BottomTabBar from "@/components/BottomTabBar";
import { User, Bell, Moon, Globe, HelpCircle, ChevronRight } from "lucide-react";

const Settings = () => {
  const settingsSections = [
    {
      icon: User,
      title: "Account",
      description: "Manage your profile",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control alerts",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">App preferences</p>
      </div>

      {/* Settings List */}
      <div className="px-4 space-y-3">
        {settingsSections.map((section, index) => (
          <div
            key={index}
            className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div className="p-3 rounded-xl bg-secondary">
              <section.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{section.title}</p>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        ))}

        {/* Quick Settings */}
        <div className="pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Quick Settings
          </p>
          <div className="space-y-3">
            <div className="glass-card p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary">
                <Moon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
              </div>
              <span className="text-xs text-primary font-medium">On</span>
            </div>
            <div className="glass-card p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Language</p>
              </div>
              <span className="text-xs text-muted-foreground">English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Help Link */}
      <div className="px-4 pt-8 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          Need help? Contact Support
        </a>
      </div>

      <BottomTabBar />
    </div>
  );
};

export default Settings;
