import { StickyNote, LogOut, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "./RoleBadge";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

interface DashboardSidebarProps {
  onCreateNote: () => void;
}

export const DashboardSidebar = ({ onCreateNote }: DashboardSidebarProps) => {
  const { user, signOut, userRole } = useAuth();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
            <StickyNote className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Private Notes</h2>
            <p className="text-xs text-muted-foreground">Secure & organized</p>
          </div>
        </div>

        {(userRole === "admin" || userRole === "editor") && (
          <Button onClick={onCreateNote} className="w-full mb-4 shadow-soft">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        )}
      </div>

      <Separator />

      <div className="flex-1 p-4">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <StickyNote className="w-4 h-4 mr-2" />
            All Notes
          </Button>
        </div>
      </div>

      <Separator />

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate text-foreground">
              {user?.user_metadata?.full_name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        
        <RoleBadge role={userRole} />
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={signOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
};
