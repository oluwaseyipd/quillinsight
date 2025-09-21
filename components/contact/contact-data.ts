// components/contact/contact-data.ts
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Headphones,
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Shield,
  Heart,
} from "lucide-react";

export interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  details: string;
  action: string;
  primary?: boolean;
}

export interface SupportLevel {
  plan: string;
  responseTime: string;
  channels: string[];
  features: string[];
  color: string;
  borderColor: string;
}

export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  timezone: string;
  flag: string;
}

export interface SupportFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: "MessageSquare",
    title: "Live Chat",
    description: "Get instant help from our support team",
    details: "Available 24/7 for Pro and Business users",
    action: "Start Chat",
    primary: true,
  },
  {
    icon: "Mail",
    title: "Email Support",
    description: "Detailed help via email",
    details: "support@quillinsight.com",
    action: "Send Email",
  },
  {
    icon: "Phone",
    title: "Phone Support",
    description: "Speak directly with our team",
    details: "+1 (555) 123-QUILL",
    action: "Call Now",
  },
  {
    icon: "Calendar",
    title: "Schedule Demo",
    description: "Personal walkthrough with our experts",
    details: "30-minute guided tour",
    action: "Book Demo",
  },
];

export const supportLevels: SupportLevel[] = [
  {
    plan: "Free",
    responseTime: "48-72 hours",
    channels: ["Community Forum", "Email"],
    features: ["Self-service help center", "Community support"],
    color: "bg-slate-50 dark:bg-slate-800/50",
    borderColor: "border-slate-200 dark:border-slate-700",
  },
  {
    plan: "Pro",
    responseTime: "24 hours",
    channels: ["Email", "Live Chat", "Priority Support"],
    features: ["Email support", "Live chat", "Video tutorials"],
    color: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-700",
  },
  {
    plan: "Business",
    responseTime: "4 hours",
    channels: ["Email", "Live Chat", "Phone", "Dedicated Manager"],
    features: ["Priority support", "Phone support", "Account manager"],
    color: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-700",
  },
  {
    plan: "Enterprise",
    responseTime: "1 hour",
    channels: ["All channels", "Dedicated Team", "24/7 Support"],
    features: ["White-glove support", "Custom training", "SLA guarantee"],
    color: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-700",
  },
];

export const officeLocations: OfficeLocation[] = [
  {
    city: "San Francisco",
    address: "123 Innovation Drive, Suite 400",
    phone: "+1 (415) 555-0123",
    timezone: "PST",
    flag: "🇺🇸",
  },
  {
    city: "New York",
    address: "456 Business Plaza, 25th Floor",
    phone: "+1 (212) 555-0456",
    timezone: "EST",
    flag: "🇺🇸",
  },
  {
    city: "London",
    address: "78 Tech Street, Central London",
    phone: "+44 20 7123 4567",
    timezone: "GMT",
    flag: "🇬🇧",
  },
];

export const supportFeatures: SupportFeature[] = [
  {
    icon: "Zap",
    title: "Lightning Fast",
    description: "95% satisfaction rate with quick resolutions",
  },
  {
    icon: "Shield",
    title: "Expert Knowledge",
    description: "Technical specialists who know QuillInsight inside out",
  },
  {
    icon: "Heart",
    title: "Personal Touch",
    description: "Human support that actually cares about your success",
  },
];
