import { ReactNode } from "react";
import { LucideIcon, ShieldCheck, Lock } from "lucide-react";

interface ScannerCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isActive?: boolean;
  onClick: () => void;
  children?: ReactNode;
}

const ScannerCard = ({ icon: Icon, title, description, isActive, onClick, children }: ScannerCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`scanner-card group relative overflow-hidden ${
        isActive ? "border-primary/70 shadow-[0_0_30px_hsl(187_85%_53%_/_0.2)]" : ""
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl transition-colors duration-300 ${
            isActive ? "bg-primary/20" : "bg-secondary"
          }`}>
            <Icon className={`h-6 w-6 transition-colors duration-300 ${
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            }`} />
          </div>
          
          {/* Privacy Badge */}
          <div className="flex items-center gap-1 text-xs text-success">
            <Lock className="h-3 w-3" />
            <span>Encrypted</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {children}
      </div>
    </div>
  );
};

export default ScannerCard;
