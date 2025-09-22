"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Palette,
  Shield,
  FileText,
  Bell,
  Globe,
  Settings,
  UploadCloud,
  Key,
  EyeOff,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Section =
  | "profile"
  | "appearance"
  | "security"
  | "documents"
  | "notifications"
  | "localization"
  | "general";

interface SettingsSectionProps {
  activeSection: Section;
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  activeSection,
  activeTheme,
  setActiveTheme,\
}) => {\
  const [name, setName] = useState("John Doe");\
  const [email, setEmail] = useState("john.doe@example.com");\
  const [bio, setBio] = useState("A passionate note-taker and knowledge organizer.");\
\
  switch (activeSection) {\
    case "profile":
      return <ProfileSettings name={name} email={email} bio={bio} setName={setName} setBio={setBio} />;\
    case "appearance":\
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
            {/* Appearance settings content here */}
            <p>Appearance settings content goes here.</p>
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
            {/* Security settings content here */}
            <p>Security settings content goes here.</p>
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
            {/* Document preferences content here */}
            <p>Document preferences content goes here.</p>
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
            {/* Notifications content here */}
            <p>Notifications content goes here.</p>
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
              Adjust language and accessibility options for a better experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Localization content here */}
            <p>Localization content goes here.</p>
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
            {/* General content here */}
            <p>General content goes here.</p>
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
};

const ProfileSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" /> Profile Settings
        </CardTitle>\
        <CardDescription>\
          Manage your public profile and account details.\
        </CardDescription>\
      </CardHeader>\
      <CardContent className="space-y-6">\
        <div className="flex items-center space-x-4">\
          <Avatar className="w-20 h-20">\
            <AvatarImage\
              src="/images/placeholder-avatar.jpg"\
              alt="User Avatar"\
            />\
            <AvatarFallback>CN</AvatarFallback>\
          </Avatar>\
          <div className="space-y-1">\
            <Label htmlFor="avatar-upload">Profile Picture</Label>\
            <Input id="avatar-upload" type="file" className="w-auto" />\
            <Button variant="outline" size="sm" className="mt-2">\
              <UploadCloud className="w-4 h-4 mr-2" /> Upload New Avatar\
            </Button>\
          </div>\
        </div>\
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\
          <div className="space-y-2">\
            <Label htmlFor="name">Name</Label>\
            <Input id="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />\
          </div>\
          <div className="space-y-2">\
            <Label htmlFor="email">Email</Label>\
            <Input\
              id="email"\
              type="email"\
              defaultValue={email}\
              disabled\
            />\
          </div>\
        </div>\
        <div className="space-y-2">\
          <Label htmlFor="bio">Bio</Label>\
          <Textarea\
            id="bio"\
            defaultValue={bio}\
            rows={3}\
            onChange={(e) => setBio(e.target.value)}\
          />\
        </div>\
        <Button>Save Profile Changes</Button>\
\
        <Separator />\
\
        <h3 className="text-lg font-semibold flex items-center gap-2">\
          <Key className="w-4 h-4" /> Account Management\
        </h3>\
        <div className="space-y-4">\
          <div className="space-y-2">\
            <Label htmlFor="current-password">Current Password</Label>\
            <Input\
              id="current-password"\
              type="password"\
              placeholder="Enter current password"\
            />\
          </div>\
          <div className="space-y-2">\
            <Label htmlFor="new-password">New Password</Label>\
            <Input\
              id="new-password"\
              type="password"\
              placeholder="Enter new password"\
            />\
          </div>\
          <div className="space-y-2">\
            <Label htmlFor="confirm-password">Confirm New Password</Label>\
            <Input\
              id="confirm-password"\
              type="password"\
              placeholder="Confirm new password"\
            />\
          </div>\
          <Button variant="outline">Change Password</Button>\
        </div>\
\
        <Separator />\
\
        <div className="space-y-4">\
          <div className="flex items-center justify-between">\
            <div>\
              <h4 className="font-medium">Deactivate Account</h4>\
              <p className="text-sm text-muted-foreground">\
                Temporarily disable your account. You can reactivate it\
                later.\
              </p>\
            </div>\
            <Button\
              variant="destructive"\
              className="flex items-center gap-2"\
            >\
              <EyeOff className="w-4 h-4" /> Deactivate\
            </Button>\
          </div>\
          <div className="flex items-center justify-between">\
            <div>\
              <h4 className="font-medium">Delete Account</h4>\
              <p className="text-sm text-muted-foreground">\
                Permanently delete your account and all associated data.\
                This action cannot be undone.\
              </p>\
            </div>\
            <Button\
              variant="destructive"\
              className="flex items-center gap-2"\
            >\
              <Trash2 className="w-4 h-4" /> Delete Account\
            </Button>\
          </div>\
        </div>\
      </CardContent>\
    </Card>\
  );\
};\
  );
};

export default SettingsSection;
