// app/features/page.tsx
import { Metadata } from "next";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import {
  FeaturesHero,
  CoreFeaturesSection,
  AdvancedCapabilitiesSection,
  AIFeaturesSpotlightSection,
} from "@/components/features";

export const metadata: Metadata = {
  title: "Features - QuillInsight | AI-Powered Note Taking",
  description:
    "Discover all the powerful features that make QuillInsight the ultimate AI-powered note-taking solution for professionals and teams.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <FeaturesHero />

      {/* Core Features */}
      <CoreFeaturesSection />

      {/* Advanced Capabilities */}
      <AdvancedCapabilitiesSection />

      {/* AI Features Spotlight */}
      <AIFeaturesSpotlightSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
