import { Badge } from "@/components/ui/badge";
import { Shield, Edit, Eye } from "lucide-react";

interface RoleBadgeProps {
  role: string | null;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  if (!role) return null;

  const getRoleConfig = () => {
    switch (role) {
      case "admin":
        return {
          icon: Shield,
          label: "Admin",
          variant: "default" as const,
          className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        };
      case "editor":
        return {
          icon: Edit,
          label: "Editor",
          variant: "default" as const,
          className: "bg-primary text-primary-foreground hover:bg-primary/90",
        };
      case "viewer":
        return {
          icon: Eye,
          label: "Viewer",
          variant: "secondary" as const,
          className: "",
        };
      default:
        return null;
    }
  };

  const config = getRoleConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
};
