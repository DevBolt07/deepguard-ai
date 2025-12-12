import { Shield, LayoutDashboard, ScanSearch, GraduationCap, Settings } from "lucide-react";
import { NavLink } from "./NavLink";

const Navbar = () => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/scan", label: "Scan Media", icon: ScanSearch },
    { to: "/education", label: "Education", icon: GraduationCap },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 h-8 w-8 animate-pulse-slow rounded-full bg-primary/20 blur-md" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">DeepGuard</span>
              <span className="text-muted-foreground"> AI</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                activeClassName="text-primary bg-primary/10"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(187_85%_53%_/_0.3)]">
            <ScanSearch className="h-4 w-4" />
            Quick Scan
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
