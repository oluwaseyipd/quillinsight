// components/features/features-data.ts
import {
  Brain,
  FileText,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Search,
  Users,
  BarChart3,
  Sparkles,
  Tag,
  FolderOpen,
  Clock,
  Download,
  Palette,
  Lock,
  RefreshCw,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export interface CoreFeature {
  icon: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface AdvancedFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const coreFeatures: CoreFeature[] = [
  {
    icon: "Brain",
    title: "AI-Powered Summarization",
    description:
      "Get instant, intelligent summaries of your notes with advanced AI that understands context and extracts key insights.",
    highlights: ["Context-aware", "Multi-language support", "Custom length"],
  },
  {
    icon: "Sparkles",
    title: "Smart Auto-Tagging",
    description:
      "Never manually tag notes again. Our AI automatically categorizes and tags your content for effortless organization.",
    highlights: ["Auto-categorization", "Custom tags", "Bulk operations"],
  },
  {
    icon: "Search",
    title: "Semantic Search",
    description:
      "Find what you're looking for with AI-powered search that understands meaning, not just keywords.",
    highlights: ["Natural language", "Cross-references", "Instant results"],
  },
  {
    icon: "FileText",
    title: "Rich Text Editor",
    description:
      "Write with a beautiful, distraction-free editor that supports markdown, formatting, and collaborative editing.",
    highlights: ["Markdown support", "Real-time sync", "Version history"],
  },
  {
    icon: "FolderOpen",
    title: "Smart Organization",
    description:
      "Organize notes with folders, tags, and AI-suggested categories that adapt to your workflow.",
    highlights: ["Nested folders", "Smart suggestions", "Quick access"],
  },
  {
    icon: "Users",
    title: "Team Collaboration",
    description:
      "Share notes, collaborate in real-time, and manage team knowledge with advanced permission controls.",
    highlights: ["Real-time editing", "Permission levels", "Team spaces"],
  },
];

export const advancedFeatures: AdvancedFeature[] = [
  {
    icon: "BarChart3",
    title: "Analytics & Insights",
    description:
      "Track your writing patterns and productivity with detailed analytics.",
  },
  {
    icon: "Globe",
    title: "Multi-Platform Sync",
    description:
      "Access your notes anywhere with seamless sync across all devices.",
  },
  {
    icon: "Download",
    title: "Export & Backup",
    description: "Export to multiple formats and automatic cloud backups.",
  },
  {
    icon: "Palette",
    title: "Customizable Themes",
    description: "Personalize your workspace with themes and layout options.",
  },
  {
    icon: "Lock",
    title: "End-to-End Encryption",
    description:
      "Your notes are encrypted and secure with zero-knowledge architecture.",
  },
  {
    icon: "RefreshCw",
    title: "Version History",
    description:
      "Never lose work with automatic version control and restoration.",
  },
];
