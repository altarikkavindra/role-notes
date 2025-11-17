import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { NoteCard } from "@/components/NoteCard";
import { CreateNoteDialog } from "@/components/CreateNoteDialog";
import { useToast } from "@/hooks/use-toast";
import { Pin } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string | null;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setDialogOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setDialogOpen(true);
  };

  const handleSaveNote = async (title: string, content: string) => {
    try {
      if (editingNote) {
        // Update existing note
        const { error } = await supabase
          .from("notes")
          .update({ title, content })
          .eq("id", editingNote.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Note updated successfully",
        });
      } else {
        // Create new note
        const { error } = await supabase.from("notes").insert({
          title,
          content,
          user_id: user?.id,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Note created successfully",
        });
      }

      fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note deleted successfully",
      });

      fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleTogglePin = async (id: string, isPinned: boolean) => {
    try {
      const { error } = await supabase
        .from("notes")
        .update({ is_pinned: isPinned })
        .eq("id", id);

      if (error) throw error;

      fetchNotes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const pinnedNotes = notes.filter((note) => note.is_pinned);
  const unpinnedNotes = notes.filter((note) => !note.is_pinned);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar onCreateNote={handleCreateNote} />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Notes</h1>
            <p className="text-muted-foreground">
              {userRole === "viewer" && "You have view-only access to these notes"}
              {userRole === "editor" && "You can create and edit notes"}
              {userRole === "admin" && "You have full access to manage all notes"}
            </p>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No notes yet</p>
              {(userRole === "admin" || userRole === "editor") && (
                <p className="text-sm text-muted-foreground">
                  Click "New Note" to create your first note
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {pinnedNotes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Pin className="w-4 h-4 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Pinned Notes</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pinnedNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEditNote}
                        onDelete={handleDeleteNote}
                        onTogglePin={handleTogglePin}
                      />
                    ))}
                  </div>
                </div>
              )}

              {unpinnedNotes.length > 0 && (
                <div>
                  {pinnedNotes.length > 0 && (
                    <h2 className="text-lg font-semibold text-foreground mb-4">All Notes</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unpinnedNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEditNote}
                        onDelete={handleDeleteNote}
                        onTogglePin={handleTogglePin}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <CreateNoteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />
    </div>
  );
};

export default Dashboard;
