"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Palette,
  Shield,
  FileText,
  Bell,
  Globe,
  Settings,
} from "lucide-react";

type Section =
  | "profile"
  | "appearance"
  | "security"
  | "documents"
  | "notifications"
  | "localization"
  | "general";

interface SettingsSidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-text/10 p-4 flex-shrink-0">
      <h2 className="text-xl font-bold mb-4 text-text">Settings</h2>
      <nav className="space-y-1">
        <Button
          variant={activeSection === "profile" ? "secondary" : "ghost"}
          className="w-full justify-start flex items-center gap-2"
          onClick={() => setActiveSection("profile")}
        >
          <User className="w-4 h-4" /> Profile
        </Button>
        <Button
          variant={activeSection === "appearance" ? "secondary" : "ghost"}
          className="w-full justify-start flex items-center gap-2"
          onClick={() => setActiveSection("appearance")}
        >
          <Palette className="w-4 h-4" /> Appearance
        </Button>
        <Button
          variant={activeSection === "security" ? "secondary" : "ghost"}
          className="w-full justify-start flex items-center gap-2"
          onClick={() => setActiveSection("security")}
        >
          <Shield className="w-4 h-4" /> Security & Privacy
        </Button>
        <Button
          variant={activeSection === "documents" ? "secondary" : "ghost"}
          className="w-full justify-start flex items-center gap-2"
          onClick={() => setActiveSection("documents")}
        >
          <FileText className="w-4 h-4" /> Document Preferences
        </Button>
        <Button
          variant={activeSection === "notifications" ? "secondary" : "ghost"}
          className="w-full justify-start flex items-center gap-2"
          onClick={() => setActiveSection("notifications")}
        >
          <Bell className="w-4 h-4" /> Notifications
        </Button>
        <Button
          variant={activeSection === "localization" ? "secondary" : "ghost"}
          className="w-full justify-start flex items-center gap-2"
          onClick={() => setActiveSection("localization")}
        >
          <Globe className="w-4 h-4" /> Localization & Accessibility
        </Button>
        <Button
          variant={activeSection === "general" ? "secondary" : "ghost"}
          className="w-full justify-start flex items-center gap-2"
          onClick={() => setActiveSection("general")}
        >
          <Settings className="w-4 h-4" /> General
        </Button>
      </nav>
    </div>
  );
};

export default SettingsSidebar;
