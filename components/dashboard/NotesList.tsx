"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Search,
  Calendar,
  Tag,
  FileText,
  Sparkles,
  Clock,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Folder,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type SortOption = "updated" | "created" | "title";
type ViewMode = "grid" | "list";

export default function NotesList({
  selectedFolder,
  selectedTag,
}: {
  selectedFolder?: string | null;
  selectedTag?: string | null;
}) {
  const supabase = createClient();
  const [allNotes, setAllNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [sortDesc, setSortDesc] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [folders, setFolders] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch notes
        const { data: notesData, error: notesError } = await supabase
          .from("notes")
          .select("*, note_tags(tags(id, name))")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false });

        if (notesError) {
          console.error("Error fetching notes:", notesError);
        } else {
          const notesWithTags = notesData.map((note) => ({
            ...note,
            tags: note.note_tags?.map((nt: any) => nt.tags) || [],
          }));
          setAllNotes(notesWithTags);
        }

        // Fetch folders
        const { data: foldersData } = await supabase
          .from("folders")
          .select("*")
          .eq("user_id", user.id);
        setFolders(foldersData || []);

        // Fetch tags
        const { data: tagsData } = await supabase
          .from("tags")
          .select("*")
          .eq("user_id", user.id);
        setTags(tagsData || []);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let notes = [...allNotes];

    // Apply filters
    if (selectedFolder) {
      notes = notes.filter((note) => note.folder_id === selectedFolder);
    }

    if (selectedTag) {
      notes = notes.filter((note) =>
        note.tags.some((tag: any) => tag.id === selectedTag),
      );
    }

    if (searchQuery) {
      notes = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply sorting
    notes.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "created":
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        case "updated":
        default:
          aValue = new Date(a.updated_at);
          bValue = new Date(b.updated_at);
          break;
      }

      if (sortBy === "title") {
        return sortDesc
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      } else {
        return sortDesc
          ? bValue.getTime() - aValue.getTime()
          : aValue.getTime() - bValue.getTime();
      }
    });

    setFilteredNotes(notes);
  }, [searchQuery, selectedFolder, selectedTag, allNotes, sortBy, sortDesc]);

  const createNewNote = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("notes")
        .insert([
          {
            title: "Untitled Note",
            content: "",
            user_id: user.id,
            folder_id: selectedFolder || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating note:", error);
      } else if (data) {
        router.push(`/note/${data.id}`);
      }
    }
  };

  const getSelectedFolderName = () => {
    const folder = folders.find((f) => f.id === selectedFolder);
    return folder?.name || "All Notes";
  };

  const getSelectedTagName = () => {
    const tag = tags.find((t) => t.id === selectedTag);
    return tag?.name;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const getPreviewText = (content: string) => {
    return (
      content.replace(/[#*_`]/g, "").substring(0, 120) +
      (content.length > 120 ? "..." : "")
    );
  };

  if (isLoading) {
    return (
      <div
        className="p-8 flex items-center justify-center h-64"
        style={{ color: "var(--color-text)" }}
      >
        <div className="flex items-center space-x-3">
          <div
            className="w-6 h-6 rounded-full animate-spin border-2 border-t-transparent"
            style={{ borderColor: "var(--color-accent)" }}
          />
          <span>Loading notes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Title and Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {selectedFolder && (
                <>
                  <Folder
                    className="h-4 w-4"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {getSelectedFolderName()}
                  </span>
                </>
              )}
              {selectedTag && (
                <>
                  <Tag
                    className="h-4 w-4"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    #{getSelectedTagName()}
                  </span>
                </>
              )}
              {!selectedFolder && !selectedTag && (
                <>
                  <FileText
                    className="h-4 w-4"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    All Notes
                  </span>
                </>
              )}
            </div>
            <h1
              className="text-2xl font-bold font-heading"
              style={{ color: "var(--color-text)" }}
            >
              {filteredNotes.length}{" "}
              {filteredNotes.length === 1 ? "Note" : "Notes"}
            </h1>
          </div>

          <Button
            onClick={createNewNote}
            className="shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "white",
            }}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Note</span>
          </Button>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
            <Input
              placeholder="Search notes by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 shadow-sm border-2 transition-all duration-200 focus:shadow-md"
              style={{
                backgroundColor: "var(--color-bg)",
                borderColor: searchQuery
                  ? "var(--color-accent)"
                  : "rgba(107, 77, 230, 0.2)",
                color: "var(--color-text)",
              }}
            />
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-2">
            {/* Sort Controls */}
            <div className="flex items-center space-x-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 rounded-lg border text-sm transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: "rgba(107, 77, 230, 0.2)",
                  color: "var(--color-text)",
                }}
              >
                <option value="updated">Last Updated</option>
                <option value="created">Date Created</option>
                <option value="title">Title</option>
              </select>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSortDesc(!sortDesc)}
                className="h-10 w-10"
                style={{ color: "var(--color-text)" }}
              >
                {sortDesc ? (
                  <SortDesc className="h-4 w-4" />
                ) : (
                  <SortAsc className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* View Mode Toggle */}
            <div
              className="flex rounded-lg border overflow-hidden"
              style={{ borderColor: "rgba(107, 77, 230, 0.2)" }}
            >
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-10 w-10 rounded-none cursor-pointer px-2"
                style={{
                  backgroundColor:
                    viewMode === "grid" ? "var(--color-accent)" : "transparent",
                  color: viewMode === "grid" ? "white" : "var(--color-text)",
                }}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-10 w-10 rounded-none cursor-pointer px-2"
                style={{
                  backgroundColor:
                    viewMode === "list" ? "var(--color-accent)" : "transparent",
                  color: viewMode === "list" ? "white" : "var(--color-text)",
                }}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid/List */}
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(107, 77, 230, 0.1)" }}
          >
            <FileText
              className="h-8 w-8"
              style={{ color: "var(--color-accent)" }}
            />
          </div>
          <div className="text-center space-y-2">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p
              className="text-sm opacity-60 max-w-sm"
              style={{ color: "var(--color-text)" }}
            >
              {searchQuery
                ? "Try adjusting your search terms or create a new note."
                : "Create your first note to get started with QuillInsight."}
            </p>
          </div>
          <Button
            onClick={createNewNote}
            className="flex items-center mt-4 px-6 py-3 rounded-full cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] border-2 h-full"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "white",
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create First Note
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredNotes.map((note) => (
            <Link href={`/note/${note.id}`} key={note.id} className="group">
              {viewMode === "grid" ? (
                <Card
                  className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02] border-2 h-full"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "rgba(107, 77, 230, 0.1)",
                    color: "var(--color-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(107, 77, 230, 0.1)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between space-x-2">
                      <CardTitle
                        className="text-lg font-semibold line-clamp-2 group-hover:text-accent transition-colors duration-200"
                        style={{ color: "var(--color-text)" }}
                      >
                        {note.title}
                      </CardTitle>
                      {note.ai_summary && (
                        <Sparkles
                          className="h-4 w-4 flex-shrink-0 mt-1"
                          style={{ color: "var(--color-accent)" }}
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p
                      className="text-sm opacity-70 line-clamp-3"
                      style={{ color: "var(--color-text)" }}
                    >
                      {getPreviewText(note.content) || "No content"}
                    </p>

                    {note.tags && note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 3).map((tag: any) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 text-xs rounded-full transition-all duration-200"
                            style={{
                              backgroundColor: "rgba(107, 77, 230, 0.2)",
                              color: "var(--color-accent)",
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                        {note.tags.length > 3 && (
                          <span
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: "rgba(107, 77, 230, 0.1)",
                              color: "var(--color-text)",
                            }}
                          >
                            +{note.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div
                      className="flex items-center justify-between pt-2 border-t border-opacity-10"
                      style={{ borderColor: "var(--color-text)" }}
                    >
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 opacity-50" />
                        <span
                          className="text-xs opacity-60"
                          style={{ color: "var(--color-text)" }}
                        >
                          {formatDate(note.updated_at)}
                        </span>
                      </div>
                      {note.folder_id && (
                        <div className="flex items-center space-x-1">
                          <Folder className="h-3 w-3 opacity-50" />
                          <span
                            className="text-xs opacity-60"
                            style={{ color: "var(--color-text)" }}
                          >
                            {folders.find((f) => f.id === note.folder_id)?.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 border-l-transparent hover:border-l-accent"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderColor: "rgba(107, 77, 230, 0.1)",
                    color: "var(--color-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeftColor =
                      "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeftColor = "transparent";
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3
                            className="font-semibold text-lg group-hover:text-accent transition-colors duration-200"
                            style={{ color: "var(--color-text)" }}
                          >
                            {note.title}
                          </h3>
                          {note.ai_summary && (
                            <Sparkles
                              className="h-4 w-4"
                              style={{ color: "var(--color-accent)" }}
                            />
                          )}
                        </div>

                        <p
                          className="text-sm opacity-70 line-clamp-2"
                          style={{ color: "var(--color-text)" }}
                        >
                          {getPreviewText(note.content) || "No content"}
                        </p>

                        <div
                          className="flex items-center space-x-4 text-xs opacity-60"
                          style={{ color: "var(--color-text)" }}
                        >
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(note.updated_at)}</span>
                          </div>
                          {note.folder_id && (
                            <div className="flex items-center space-x-1">
                              <Folder className="h-3 w-3" />
                              <span>
                                {
                                  folders.find((f) => f.id === note.folder_id)
                                    ?.name
                                }
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {note.tags.slice(0, 4).map((tag: any) => (
                            <span
                              key={tag.id}
                              className="px-2 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: "rgba(107, 77, 230, 0.2)",
                                color: "var(--color-accent)",
                              }}
                            >
                              {tag.name}
                            </span>
                          ))}
                          {note.tags.length > 4 && (
                            <span
                              className="px-2 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: "rgba(107, 77, 230, 0.1)",
                                color: "var(--color-text)",
                              }}
                            >
                              +{note.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
