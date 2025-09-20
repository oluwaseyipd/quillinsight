"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Folder,
  Tag,
  PlusCircle,
  LogOut,
  FileText,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar({ setSelectedFolder, setSelectedTag }) {
  const supabase = createClient();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [folders, setFolders] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: foldersData, error: foldersError } = await supabase
          .from("folders")
          .select("*")
          .eq("user_id", user.id);
        if (foldersError)
          console.error("Error fetching folders:", foldersError);
        else setFolders(foldersData || []);

        const { data: tagsData, error: tagsError } = await supabase
          .from("tags")
          .select("*")
          .eq("user_id", user.id);
        if (tagsError) console.error("Error fetching tags:", tagsError);
        else setTags(tagsData || []);
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (newFolderName.trim() === "") return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("folders")
        .insert([{ name: newFolderName, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error("Error creating folder:", error);
      } else if (data) {
        setFolders([...folders, data]);
        setNewFolderName("");
        setIsAddingFolder(false);
      }
    }
  };

  const handleFolderClick = (folderId: string) => {
    if (activeFolder === folderId) {
      setActiveFolder(null);
      setSelectedFolder(null);
    } else {
      setActiveFolder(folderId);
      setSelectedFolder(folderId);
      setActiveTag(null);
      setSelectedTag(null);
    }
  };

  const handleTagClick = (tagId: string) => {
    if (activeTag === tagId) {
      setActiveTag(null);
      setSelectedTag(null);
    } else {
      setActiveTag(tagId);
      setSelectedTag(tagId);
      setActiveFolder(null);
      setSelectedFolder(null);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <motion.div
      initial={{ width: isCollapsed ? "4rem" : "16rem" }}
      animate={{ width: isCollapsed ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen flex flex-col shadow-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        color: "var(--color-text)",
      }}
    >
      {/* Header with Logo and Collapse Button */}
      <div
        className="flex items-center justify-between p-4 border-b border-opacity-10 relative"
        style={{ borderColor: "var(--color-text)" }}
      >
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center space-x-2"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1
                className="text-xl font-bold font-heading"
                style={{ color: "var(--color-text)" }}
              >
                QuillInsight
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto shadow-md"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </motion.div>
        )}

        {/* Collapse Toggle Button - Positioned at top right */}
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="rounded-full w-8 h-8 transition-all duration-200 hover:scale-105 absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 shadow-lg"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-accent)",
            color: "var(--color-accent)",
            border: "2px solid var(--color-accent)",
          }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </motion.div>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.href}
                className={`
                  group flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden
                  ${
                    pathname === item.href
                      ? "text-white shadow-lg transform scale-[1.02]"
                      : "hover:bg-opacity-80 hover:transform hover:scale-[1.01]"
                  }
                `}
                style={{
                  backgroundColor:
                    pathname === item.href
                      ? "var(--color-accent)"
                      : "transparent",
                  color: pathname === item.href ? "white" : "var(--color-text)",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(var(--color-accent-rgb, 107, 77, 230), 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <div className="relative z-10 flex items-center justify-center">
                  <item.icon className="h-5 w-5" />
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="relative z-10 font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Folders Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-3 mb-3">
            {!isCollapsed && (
              <h2
                className="text-sm font-semibold opacity-70 font-heading"
                style={{ color: "var(--color-text)" }}
              >
                Folders
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAddingFolder(!isAddingFolder)}
              className="w-6 h-6 rounded-md hover:shadow-sm transition-all duration-200"
              style={{
                color: "var(--color-accent)",
                backgroundColor: isAddingFolder
                  ? "rgba(107, 77, 230, 0.1)"
                  : "transparent",
              }}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>

          <AnimatePresence>
            {isAddingFolder && !isCollapsed && (
              <motion.form
                onSubmit={handleCreateFolder}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-3 pb-3"
              >
                <Input
                  type="text"
                  placeholder="New folder name..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="h-8 text-sm"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    borderColor: "var(--color-accent)",
                    color: "var(--color-text)",
                  }}
                  autoFocus
                />
              </motion.form>
            )}
          </AnimatePresence>

          <ul className="space-y-1">
            {folders.map((folder) => (
              <li key={folder.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFolderClick(folder.id);
                  }}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeFolder === folder.id
                      ? "shadow-sm transform scale-[1.02]"
                      : "hover:shadow-sm hover:transform hover:scale-[1.01]"
                  }`}
                  style={{
                    backgroundColor:
                      activeFolder === folder.id
                        ? "rgba(107, 77, 230, 0.2)"
                        : "transparent",
                    color: "var(--color-text)",
                  }}
                  onMouseEnter={(e) => {
                    if (activeFolder !== folder.id) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(107, 77, 230, 0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFolder !== folder.id) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <Folder className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate text-sm">{folder.name}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags Section */}
        <div className="mt-6 mb-6">
          <div className="flex items-center justify-between px-3 mb-3">
            {!isCollapsed && (
              <h2
                className="text-sm font-semibold opacity-70 font-heading"
                style={{ color: "var(--color-text)" }}
              >
                Tags
              </h2>
            )}
          </div>

          {!isCollapsed ? (
            <div className="px-3">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <a
                    key={tag.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTagClick(tag.id);
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                      activeTag === tag.id
                        ? "shadow-sm transform scale-105"
                        : "hover:shadow-sm hover:transform hover:scale-105"
                    }`}
                    style={{
                      backgroundColor:
                        activeTag === tag.id
                          ? "var(--color-accent)"
                          : "rgba(107, 77, 230, 0.2)",
                      color:
                        activeTag === tag.id ? "white" : "var(--color-text)",
                    }}
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tag.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-3 flex flex-col gap-1">
              {tags.slice(0, 3).map((tag) => (
                <a
                  key={tag.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTagClick(tag.id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor:
                      activeTag === tag.id
                        ? "var(--color-accent)"
                        : "rgba(107, 77, 230, 0.2)",
                    color: activeTag === tag.id ? "white" : "var(--color-text)",
                  }}
                  title={tag.name}
                >
                  <Tag className="h-3 w-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* User Profile and Logout Section */}
      <div
        className="p-4 border-t border-opacity-10"
        style={{ borderColor: "var(--color-text)" }}
      >
        {!isCollapsed ? (
          <div className="space-y-3">
            {/* User Info */}
            {user && (
              <div
                className="flex items-center space-x-3 px-3 py-2 rounded-lg"
                style={{ backgroundColor: "rgba(107, 77, 230, 0.1)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--color-text)" }}
                  >
                    {user.email?.split("@")[0] || "User"}
                  </p>
                  <p
                    className="text-xs opacity-60 truncate"
                    style={{ color: "var(--color-text)" }}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-sm"
              style={{
                color: "#ef4444",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(239, 68, 68, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {/* User Avatar - Collapsed */}
            {user && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: "var(--color-accent)" }}
                title={user.email}
              >
                <User className="h-4 w-4 text-white" />
              </div>
            )}

            {/* Logout Icon - Collapsed */}
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full mx-auto transition-all duration-200 hover:shadow-sm"
              style={{ color: "#ef4444" }}
              title="Logout"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(239, 68, 68, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
