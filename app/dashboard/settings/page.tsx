"use client";

import { useState } from "react";
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
  Contrast,
  Languages,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Section =
  | "profile"
  | "appearance"
  | "security"
  | "documents"
  | "notifications"
  | "localization"
  | "general";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<Section>("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" /> Profile Settings
              </CardTitle>
              <CardDescription>
                Manage your public profile and account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/images/placeholder-avatar.jpg"
                    alt="User Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Label htmlFor="avatar-upload">Profile Picture</Label>
                  <Input id="avatar-upload" type="file" className="w-auto" />
                  <Button variant="outline" size="sm" className="mt-2">
                    <UploadCloud className="w-4 h-4 mr-2" /> Upload New Avatar
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="A passionate note-taker and knowledge organizer."
                  rows={3}
                />
              </div>
              <Button>Save Profile Changes</Button>

              <Separator />

              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Key className="w-4 h-4" /> Account Management
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Deactivate Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable your account. You can reactivate it
                      later.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <EyeOff className="w-4 h-4" /> Deactivate
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "appearance":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" /> Appearance & Theme
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your QuillInsight dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme Selection</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {["Light", "Dark", "System", "Blue", "Green", "Purple"].map(
                    (theme) => (
                      <div
                        key={theme}
                        className={cn(
                          "border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-brand transition-colors",
                          activeTheme === theme.toLowerCase() &&
                            "border-brand ring-2 ring-brand ring-offset-2",
                        )}
                        onClick={() => setActiveTheme(theme.toLowerCase())}
                      >
                        <div
                          className={cn(
                            "w-16 h-16 rounded-full mb-2",
                            theme === "Light" && "bg-white border",
                            theme === "Dark" && "bg-gray-900",
                            theme === "System" &&
                              "bg-gradient-to-br from-white to-gray-900",
                            theme === "Blue" && "bg-blue-500",
                            theme === "Green" && "bg-green-500",
                            theme === "Purple" && "bg-purple-500",
                          )}
                        ></div>
                        <span className="text-sm font-medium">{theme}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "security":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" /> Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />{" "}
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <Switch id="2fa-toggle" checked={true} />
              </div>

              <Separator />

              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Monitor className="w-4 h-4" /> Active Sessions
              </h3>
              <p className="text-sm text-muted-foreground">
                Review and revoke active logins to your account.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Chrome on Windows</p>
                    <p className="text-xs text-muted-foreground">
                      Location: New York, USA • Last Active: Just now
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" /> Revoke
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Safari on macOS</p>
                    <p className="text-xs text-muted-foreground">
                      Location: London, UK • Last Active: 2 days ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" /> Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "documents":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> Document Preferences
              </CardTitle>
              <CardDescription>
                Set default preferences for document processing and storage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="summary-length">Default Summary Length</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="summary-length">
                    <SelectValue placeholder="Select summary length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">
                      Short (1-2 paragraphs)
                    </SelectItem>
                    <SelectItem value="medium">
                      Medium (3-5 paragraphs)
                    </SelectItem>
                    <SelectItem value="detailed">
                      Detailed (5+ paragraphs)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-tone">Default Tone</Label>
                <Select defaultValue="neutral">
                  <SelectTrigger id="default-tone">
                    <SelectValue placeholder="Select default tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="output-format">Default Output Format</Label>
                <Select defaultValue="paragraph">
                  <SelectTrigger id="output-format">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bullet">Bullet Points</SelectItem>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="table">Table</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <h3 className="text-lg font-semibold flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Storage Usage
              </h3>
              <div className="space-y-2">
                <Label>Storage Used: 1.2 GB of 5 GB</Label>
                <Slider defaultValue={[24]} max={100} step={1} disabled />
                <p className="text-sm text-muted-foreground">
                  You are currently using 24% of your allocated storage.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Archive Old Documents</Button>
                <Button variant="destructive">Delete All Documents</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "notifications":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" /> Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive updates and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Insights Digest</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a summary of your activity and key insights.
                    </p>
                  </div>
                  <Switch id="email-weekly-insights" checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Account Activity Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified about important account changes (e.g.,
                      password reset).
                    </p>
                  </div>
                  <Switch id="email-account-activity" checked={true} />
                </div>
              </div>

              <Separator />

              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BellRing className="w-4 h-4" /> In-App Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Note Processed</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a notification when your note has been processed
                      by AI.
                    </p>
                  </div>
                  <Switch id="inapp-note-processed" checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">AI Results Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Get an alert when AI summaries or insights are available.
                    </p>
                  </div>
                  <Switch id="inapp-ai-results" checked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "localization":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" /> Localization & Accessibility
              </CardTitle>
              <CardDescription>
                Adjust language and accessibility options for a better
                experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language-select">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language-select">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Volume2 className="w-4 h-4" /> Accessibility Options
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Slider defaultValue={[16]} max={24} min={12} step={1} />
                  <p className="text-sm text-muted-foreground">
                    Current font size: 16px
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      <Contrast className="w-4 h-4" /> High Contrast Mode
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Improve readability with increased color contrast.
                    </p>
                  </div>
                  <Switch id="high-contrast-mode" checked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      <Text className="w-4 h-4" /> Screen Reader Support
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Enable optimizations for screen reader software.
                    </p>
                  </div>
                  <Switch id="screen-reader-toggle" checked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "general":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" /> General Preferences
              </CardTitle>
              <CardDescription>
                Configure general application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dashboard-layout">
                  Default Dashboard Layout
                </Label>
                <Select defaultValue="grid">
                  <SelectTrigger id="dashboard-layout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">
                      <div className="flex items-center gap-2">
                        <Grid className="w-4 h-4" /> Grid View
                      </div>
                    </SelectItem>
                    <SelectItem value="list">
                      <div className="flex items-center gap-2">
                        <List className="w-4 h-4" /> List View
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document-sorting">
                  Default Document Sorting
                </Label>
                <Select defaultValue="modified">
                  <SelectTrigger id="document-sorting">
                    <SelectValue placeholder="Select sorting option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Date Created
                      </div>
                    </SelectItem>
                    <SelectItem value="modified">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Last Modified
                      </div>
                    </SelectItem>
                    <SelectItem value="title">
                      <div className="flex items-center gap-2">
                        <Type className="w-4 h-4" /> Title (A-Z)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  // Placeholder for theme state
  const [activeTheme, setActiveTheme] = useState("system");

  return (
    <div className="flex flex-col md:flex-row h-full bg-background">
      {/* Sidebar Navigation */}
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

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">{renderSection()}</div>
    </div>
  );
};

export default SettingsPage;
