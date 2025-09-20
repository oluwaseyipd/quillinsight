"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import NoteEditor from "@/components/editor/NoteEditor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

  const debouncedUpdate = useCallback(
    debounce(async (newContent: string) => {
      if (!note) return;
      setIsSaving(true);

      const { error } = await supabase
        .from("notes")
        .update({ content: newContent, updated_at: new Date().toISOString() })
        .eq("id", note.id);

      if (error) {
        console.error("Error updating note:", error);
      } else {
        setLastSaved(new Date());
      }
      setIsSaving(false);
    }, 1000),
    [note],
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
    };
  }, [params, debouncedUpdate]);

  const handleEditorUpdate = (newContent: string) => {
    setNote((prevNote) =>
      prevNote ? { ...prevNote, content: newContent } : null,
    );
    debouncedUpdate(newContent);
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

  const handleTagsChange = async (newTags: Option[]) => {
    if (!note) return;
    setSelectedTags(newTags);

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
                <div className="min-w-0">
                  <h1 className="text-xl font-bold text-text truncate">
                    {note.title}
                  </h1>
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
                className="min-h-full"
              />
            </div>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="w-80 bg-surface border-l border-text/10 flex flex-col">
          <div className="p-4 border-b border-text/10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-brand" />
              <h2 className="text-lg font-semibold text-text">AI Insights</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-text/40 cursor-help ml-1" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    AI-powered analysis that automatically generates summaries,
                    extracts key points, and suggests relevant tags based on
                    your note content.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-text/60">
              AI-powered analysis of your note
            </p>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Summary Card */}
            <Card className="border-text/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-brand" />
                  Summary
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 text-text/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get a concise overview of your note's main points</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-text/70 bg-brand/5 p-3 rounded-lg border border-brand/10">
                  AI-generated summary will appear here when you have enough
                  content.
                </div>
              </CardContent>
            </Card>

            {/* Key Points Card */}
            <Card className="border-text/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-accent" />
                  Key Points
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 text-text/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Important highlights and action items extracted from
                        your note
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-text/70 bg-accent/5 p-3 rounded-lg border border-accent/10">
                  Important highlights and action items will be extracted
                  automatically.
                </div>
              </CardContent>
            </Card>

            {/* Suggested Tags Card */}
            <Card className="border-text/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-text/60" />
                  Suggested Tags
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 text-text/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        AI-recommended tags based on your note content for
                        better organization
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className="text-xs border-text/20 text-text/60"
                  >
                    Coming soon
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="pt-4 border-t border-text/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      <div className="text-lg font-semibold text-text">
                        {
                          note.content
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length
                        }
                      </div>
                      <div className="text-xs text-text/60">Words</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total word count in your note</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      <div className="text-lg font-semibold text-text">
                        {Math.ceil(
                          note.content
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length / 200,
                        )}
                      </div>
                      <div className="text-xs text-text/60">Min read</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estimated reading time (based on 200 words/min)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default NotePage;
