import { ScanSearch, Clock, Settings } from "lucide-react";
import { NavLink } from "./NavLink";

const BottomTabBar = () => {
  const tabs = [
    { to: "/", label: "Scan Media", icon: ScanSearch },
    { to: "/history", label: "History", icon: Clock },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className="flex flex-col items-center justify-center gap-1 px-6 py-2 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <tab.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabBar;
