import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Pin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string | null;
    is_pinned: boolean;
    created_at: string;
    updated_at: string;
  };
  onEdit: (note: any) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, isPinned: boolean) => void;
}

export const NoteCard = ({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) => {
  const { userRole } = useAuth();
  const canEdit = userRole === "admin" || userRole === "editor";
  const canDelete = userRole === "admin";

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
          {note.is_pinned && <Pin className="w-4 h-4 text-primary fill-primary" />}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {note.content || "No content"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {canEdit && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onTogglePin(note.id, !note.is_pinned)}
              >
                <Pin className={`w-4 h-4 ${note.is_pinned ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit(note)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </>
          )}
          {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(note.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
