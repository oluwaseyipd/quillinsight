"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import SettingsSection from "@/components/settings/SettingsSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  User,
  Palette,
  Shield,
  FileText,
  Bell,
  Globe,
  Settings,
  LogOut,
  Trash2,
  Key,
  EyeOff,
  CheckCircle,
  XCircle,
  UploadCloud,
  Monitor,
  List,
  Grid,
  Calendar,
  Clock,
  Type,
  Mail,
  BellRing,
  Volume2,
  Text,
} from "lucide-react";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<Section>("profile");
  // Placeholder for theme state
  const [activeTheme, setActiveTheme] = useState("system");

  return (
    <div className="flex flex-col md:flex-row h-full bg-background">
      {/* Sidebar Navigation */}\n      <SettingsSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}\n      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <SettingsSection
          activeSection={activeSection}
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
        />
      </div>
    </div>
  );
};

export default SettingsPage;

type Section =
  | "profile"
  | "appearance"
  | "security"
  | "documents"
  | "notifications"
  | "localization"
  | "general";
} from "lucide-react";
