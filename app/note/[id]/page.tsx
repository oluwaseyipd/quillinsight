"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import NoteEditor from "@/components/editor/NoteEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Trash2,
  Folder,
  Tag,
  Save,
  Clock,
  Sparkles,
  Brain,
  FileText,
  Target,
  HelpCircle,
  Loader2,
  AlertCircle,
  Edit3,
  Check,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { debounce } from "lodash";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert } from "@/components/ui/LegacyAlert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { cn } from "@/lib/utils";
import { generateTitle } from "@/lib/ai";

type Note = {
  id: string;
  title: string;
  content: string;
  folder_id: string | null;
  updated_at: string;
  created_at: string;
};

type Folder = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};

type Option = {
  value: string;
  label: string;
};

const NotePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const supabase = createClient();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [qaQuery, setQaQuery] = useState("");

  // Title editing state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  const debouncedUpdate = useCallback(
    debounce(async (newContent: string) => {
      if (!note) {
        console.log("💾 Auto-save blocked: No note object");
        return;
      }

      console.log("💾 Auto-save starting:", {
        noteId: note.id,
        contentLength: newContent.length,
        contentPreview: newContent.substring(0, 100),
        timestamp: new Date().toISOString(),
        fullContentSent: newContent, // Log the full content being sent
      });

      setIsSaving(true);

      const { error } = await supabase
        .from("notes")
        .update({ content: newContent, updated_at: new Date().toISOString() })
        .eq("id", note.id);

      if (error) {
        console.error("💾 Auto-save failed:", error);
      } else {
        console.log("✅ Auto-save successful:", {
          noteId: note.id,
          contentLength: newContent.length,
          savedAt: new Date().toISOString(),
        });
        setLastSaved(new Date());
      }
      setIsSaving(false);
    }, 1000),
    [note],
  );

  const debouncedTitleGeneration = useCallback(
    debounce(async (content: string, noteId: string, currentTitle: string) => {
      if (
        currentTitle !== "Untitled Note" ||
        !content ||
        content.trim().length < 50
      ) {
        return;
      }

      setIsGeneratingTitle(true);
      try {
        const suggestedTitle = await generateTitle(content);

        // Update the note with the generated title
        const { error } = await supabase
          .from("notes")
          .update({
            title: suggestedTitle,
            updated_at: new Date().toISOString(),
          })
          .eq("id", noteId);

        if (!error) {
          setNote((prevNote) =>
            prevNote ? { ...prevNote, title: suggestedTitle } : null,
          );
          setLastSaved(new Date());
        }
      } catch (error) {
        console.error("Error auto-generating title:", error);
      } finally {
        setIsGeneratingTitle(false);
      }
    }, 3000),
    [supabase],
  );

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data: noteData, error: noteError } = await supabase
        .from("notes")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

      if (noteError) {
        console.error("Error fetching note:", noteError);
      } else {
        console.log("📖 Initial note loaded from database:", {
          noteId: noteData.id,
          title: noteData.title,
          hasContent: !!noteData.content,
          contentLength: noteData.content?.length || 0,
          contentPreview: noteData.content?.substring(0, 100) || "No content",
          updatedAt: noteData.updated_at,
        });
        setNote(noteData);
        setLastSaved(new Date(noteData.updated_at));
      }

      const { data: foldersData, error: foldersError } = await supabase
        .from("folders")
        .select("id, name")
        .eq("user_id", user.id);
      if (foldersError) console.error("Error fetching folders:", foldersError);
      else setFolders(foldersData);

      const { data: tagsData, error: tagsError } = await supabase
        .from("tags")
        .select("id, name")
        .eq("user_id", user.id);
      if (tagsError) console.error("Error fetching tags:", tagsError);
      else setAllTags(tagsData);

      const { data: noteTagsData, error: noteTagsError } = await supabase
        .from("note_tags")
        .select("tags(id, name)")
        .eq("note_id", resolvedParams.id);

      if (noteTagsError) {
        console.error("Error fetching note tags:", noteTagsError);
      } else {
        setSelectedTags(
          noteTagsData.map((nt: any) => ({
            value: nt.tags.id,
            label: nt.tags.name,
          })),
        );
      }

      setIsLoading(false);
    };

    fetchData();
    return () => {
      debouncedUpdate.cancel();
      debouncedUpdate.flush(); // Ensure any pending saves are executed on unmount
      debouncedTitleGeneration.cancel();
    };
  }, [params, debouncedUpdate, debouncedTitleGeneration]);

  const handleEditorUpdate = (newContent: string) => {
    console.log("📥 handleEditorUpdate - Received content:", {
      newContentLength: newContent.length,
      newContentPreview: newContent.substring(0, 100),
      timestamp: new Date().toISOString(),
    });
    setNote((prevNote) => {
      const updatedNote = prevNote
        ? { ...prevNote, content: newContent }
        : null;
      console.log("📝 handleEditorUpdate - State updated:", {
        hasNote: !!updatedNote,
        stateContentLength: updatedNote?.content?.length,
      });

      // Auto-suggest title if note has generic title and significant content
      if (updatedNote && updatedNote.title === "Untitled Note") {
        debouncedTitleGeneration(newContent, updatedNote.id, updatedNote.title);
      }

      return updatedNote;
    });
    debouncedUpdate(newContent);
    // Immediately update the last saved time to reflect user activity, even if debounce is pending
    setLastSaved(new Date());
  };

  const handleDelete = async () => {
    if (!note) return;
    const { error } = await supabase.from("notes").delete().eq("id", note.id);
    if (error) console.error("Error deleting note:", error);
    else router.push("/dashboard");
  };

  const handleFolderChange = async (folderId: string) => {
    if (!note) return;
    const newFolderId = folderId === "none" ? null : folderId;
    setNote({ ...note, folder_id: newFolderId });
    const { error } = await supabase
      .from("notes")
      .update({ folder_id: newFolderId })
      .eq("id", note.id);
    if (error) console.error("Error updating folder:", error);
  };

  const handleTitleEdit = () => {
    if (!note) return;
    setTitleInput(note.title);
    setIsEditingTitle(true);
  };

  const handleTitleSave = async () => {
    if (!note || titleInput.trim() === "") return;

    const trimmedTitle = titleInput.trim();
    setNote({ ...note, title: trimmedTitle });

    const { error } = await supabase
      .from("notes")
      .update({ title: trimmedTitle, updated_at: new Date().toISOString() })
      .eq("id", note.id);

    if (error) {
      console.error("Error updating title:", error);
      // Revert on error
      setNote({ ...note, title: note.title });
    } else {
      setLastSaved(new Date());
    }

    setIsEditingTitle(false);
    setTitleInput("");
  };

  const handleTitleCancel = () => {
    setIsEditingTitle(false);
    setTitleInput("");
  };

  const handleGenerateTitle = async () => {
    if (!note || !note.content) return;

    setIsGeneratingTitle(true);
    try {
      const suggestedTitle = await generateTitle(note.content);
      setTitleInput(suggestedTitle);
      setIsEditingTitle(true);
    } catch (error) {
      console.error("Error generating title:", error);
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSave();
    } else if (e.key === "Escape") {
      handleTitleCancel();
    }
  };

  const updateTagsInDatabase = async (newTags: Option[]) => {
    if (!note) return;

    const { error: deleteError } = await supabase
      .from("note_tags")
      .delete()
      .eq("note_id", note.id);
    if (deleteError) console.error("Error clearing tags:", deleteError);

    if (newTags.length > 0) {
      const newNoteTags = newTags.map((tag) => ({
        note_id: note.id,
        tag_id: tag.value,
      }));
      const { error: insertError } = await supabase
        .from("note_tags")
        .insert(newNoteTags);
      if (insertError) console.error("Error inserting tags:", insertError);
    }
  };

  const handleTagsChange: React.Dispatch<React.SetStateAction<Option[]>> = (
    value,
  ) => {
    const newTags = typeof value === "function" ? value(selectedTags) : value;
    setSelectedTags(newTags);
    updateTagsInDatabase(newTags);
  };

  const handleAiRequest = async (
    type: "summarize" | "insights" | "qa",
    query?: string,
  ) => {
    if (!note || !note.content?.trim()) {
      console.log("AI request blocked: no note or content", {
        note: !!note,
        content: note?.content?.length,
      });
      return;
    }

    console.log("Starting AI request:", {
      type,
      contentLength: note.content.length,
      query,
    });

    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const requestData = {
        textContent: note.content,
        type,
        query,
      };

      console.log("Frontend - Sending AI request:", {
        type,
        hasContent: !!note.content,
        contentLength: note.content?.length,
        contentPreview: note.content?.substring(0, 100) + "...",
        query: query || "none",
      });

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "AI request failed");
      }

      const data = await response.json();

      console.log("Frontend - Received AI response:", {
        type,
        hasResult: !!data.result,
        resultLength: data.result?.length,
        resultPreview: data.result?.substring(0, 200) + "...",
      });

      if (type === "summarize") setAiResult({ summary: data.result });
      if (type === "insights") setAiResult({ insights: data.result });
      if (type === "qa") setAiResult({ qa: data.result });
    } catch (err: any) {
      console.error("Frontend - AI request error:", {
        message: err.message,
        type,
        contentLength: note.content?.length,
      });
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <span className="text-text/70">Loading your note...</span>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-text/40" />
            <h2 className="text-lg font-semibold mb-2">Note Not Found</h2>
            <p className="text-text/70 mb-4">
              The note you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <TooltipProvider>
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-surface border-b border-text/10 p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center min-w-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push("/dashboard")}
                      className="shrink-0 mr-3 hover:bg-text/10"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Back to Dashboard</p>
                  </TooltipContent>
                </Tooltip>
                <div className="min-w-0 flex-1">
                  {isEditingTitle ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        onKeyDown={handleTitleKeyPress}
                        className="text-xl font-bold bg-transparent border-text/30 focus:border-brand px-0 h-8"
                        placeholder="Enter note title..."
                        autoFocus
                      />
                      <Button
                        onClick={handleTitleSave}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleTitleCancel}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">
                      <h1 className="text-xl font-bold text-text truncate flex items-center gap-2">
                        {note.title}
                        {isGeneratingTitle && (
                          <div className="flex items-center gap-1 text-sm text-brand">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span className="text-xs">Generating title...</span>
                          </div>
                        )}
                      </h1>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={handleTitleEdit}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-text/50 hover:text-text/70"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit title</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={handleGenerateTitle}
                              disabled={isGeneratingTitle || !note.content}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-text/50 hover:text-brand disabled:opacity-50"
                            >
                              {isGeneratingTitle ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Sparkles className="w-3 h-3" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate title from content</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 text-sm text-text/60 cursor-help">
                          <Clock className="w-3 h-3" />
                          {lastSaved && formatTimeAgo(lastSaved)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Last saved: {lastSaved?.toLocaleString()}</p>
                      </TooltipContent>
                    </Tooltip>
                    {isSaving && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 text-sm text-brand cursor-help">
                            <Save className="w-3 h-3 animate-pulse" />
                            Saving...
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your changes are being saved automatically</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Select
                      onValueChange={handleFolderChange}
                      value={note.folder_id || "none"}
                    >
                      <SelectTrigger className="w-[160px] border-text/20 hover:border-text/30">
                        <Folder className="w-4 h-4 mr-2 text-text/60" />
                        <SelectValue placeholder="Folder" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          <span className="text-text/70">No Folder</span>
                        </SelectItem>
                        {folders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Organize this note in a folder</p>
                  </TooltipContent>
                </Tooltip>

                <AlertDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-700 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete this note permanently</p>
                    </TooltipContent>
                  </Tooltip>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Note</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{note.title}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Note
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="px-4 py-3 bg-surface/50 border-b border-text/5">
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Tag className="w-4 h-4 text-text/60 shrink-0 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add tags to categorize and find your notes easily</p>
                </TooltipContent>
              </Tooltip>
              <MultiSelect
                options={allTags.map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                }))}
                selected={selectedTags}
                onChange={handleTagsChange}
                placeholder="Add tags to organize your note..."
                className="flex-1"
              />
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full px-6 py-4 overflow-y-auto">
              <NoteEditor
                content={note.content}
                onUpdate={handleEditorUpdate}
              />
            </div>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="w-96 bg-surface border-l border-text/10 flex flex-col">
          <div className="p-4 border-b border-text/10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-brand" />
              <h2 className="text-lg font-semibold text-text">AI Assistant</h2>
            </div>
            <p className="text-sm text-text/60">Analyze your note's content</p>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Real-time Content Tracking - Proves AI can access live content */}
            <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded space-y-1">
              <div>
                Debug: Note loaded: {note ? "Yes" : "No"} | Content length:{" "}
                {note?.content?.length || 0} | AI Loading:{" "}
                {aiLoading ? "Yes" : "No"}
              </div>
              <div>
                Live Content Preview: "
                {note?.content?.substring(0, 50) || "No content"}..."
              </div>
              <div className="text-green-600">
                ✅ AI can access this content in real-time (no save required)
              </div>
            </div>

            {/* Live Content Indicator */}
            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
              🔄 Content synced to AI:{" "}
              {note?.content
                ? "Ready for analysis"
                : "Start typing to enable AI"}
            </div>

            {/* AI Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("📋 AI SUMMARY FROM LIVE CONTENT:", {
                    hasNote: !!note,
                    contentLength: note?.content?.length,
                    contentPreview: note?.content?.substring(0, 100),
                    timestamp: new Date().toISOString(),
                  });
                  alert(
                    `AI will summarize ${note?.content?.length || 0} characters of live content!`,
                  );
                  handleAiRequest("summarize");
                }}
                disabled={aiLoading || !note?.content?.trim()}
                className="text-xs cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-3 h-3 mr-1" />
                {aiLoading ? "Loading..." : "Summarize"}
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("🔍 AI INSIGHTS FROM LIVE CONTENT:", {
                    hasNote: !!note,
                    contentLength: note?.content?.length,
                    contentPreview: note?.content?.substring(0, 100),
                    timestamp: new Date().toISOString(),
                  });
                  alert(
                    `AI will extract insights from ${note?.content?.length || 0} characters of live content!`,
                  );
                  handleAiRequest("insights");
                }}
                disabled={aiLoading || !note?.content?.trim()}
                className="text-xs cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Target className="w-3 h-3 mr-1" />
                {aiLoading ? "Loading..." : "Key Insights"}
              </Button>
            </div>

            {/* Q&A Section */}
            <div className="space-y-2 pt-2">
              <Textarea
                placeholder="Ask a question about the note..."
                value={qaQuery}
                onChange={(e) => setQaQuery(e.target.value)}
                disabled={aiLoading || !note?.content?.trim()}
                className="text-sm"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("❓ AI Q&A WITH LIVE CONTENT:", {
                    query: qaQuery,
                    hasNote: !!note,
                    contentLength: note?.content?.length,
                    contentPreview: note?.content?.substring(0, 100),
                    timestamp: new Date().toISOString(),
                  });
                  alert(
                    `AI will answer "${qaQuery}" based on ${note?.content?.length || 0} characters of live content!`,
                  );
                  handleAiRequest("qa", qaQuery);
                }}
                disabled={
                  !qaQuery?.trim() || aiLoading || !note?.content?.trim()
                }
                className="w-full cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                {aiLoading ? "Processing..." : "Ask Question"}
              </Button>
            </div>

            <Separator />

            {/* AI Results */}
            <div className="pt-2">
              {aiLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              )}

              {aiError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>AI Error</AlertTitle>
                  <AlertDescription>{aiError}</AlertDescription>
                </Alert>
              )}

              {aiResult ? (
                <div className="space-y-4">
                  {aiResult.summary && (
                    <Card className="bg-brand/5 border-brand/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand" />
                          Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="prose prose-sm dark:prose-invert max-w-none text-text/80">
                        {aiResult.summary}
                      </CardContent>
                    </Card>
                  )}
                  {aiResult.insights && (
                    <Card className="bg-accent/5 border-accent/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Target className="w-4 h-4 text-accent" />
                          Key Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="prose prose-sm dark:prose-invert max-w-none text-text/80">
                        {aiResult.insights}
                      </CardContent>
                    </Card>
                  )}
                  {aiResult.qa && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          Answer
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="prose prose-sm dark:prose-invert max-w-none text-text/80">
                        {aiResult.qa}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                !aiLoading && (
                  <div className="text-center py-10">
                    <p className="text-text/60 text-sm">
                      Your AI-generated insights will appear here.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default NotePage;
