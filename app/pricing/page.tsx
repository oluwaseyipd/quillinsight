// app/pricing/page.tsx
import { Metadata } from "next";
import Header from "@/components/Header";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { FeatureComparison } from "@/components/pricing/FeatureComparison";
import { SocialProof } from "@/components/pricing/SocialProof";
import { SecurityBadges } from "@/components/pricing/SecurityBadges";
import { FAQ } from "@/components/pricing/FAQ";
import { TrustSignals } from "@/components/pricing/TrustSignals";
import { ContactCTA } from "@/components/pricing/ContactCTA";
import FooterSection from "@/components/FooterSection";

export const metadata: Metadata = {
  title: "Pricing - QuillInsight | AI-Powered Note Taking",
  description:
    "Choose the perfect plan for your AI-powered note-taking needs. Free trial, transparent pricing, enterprise-grade security.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PricingHero />

      {/* Social Proof */}
      <SocialProof />

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Feature Comparison */}
      <FeatureComparison />

      {/* Security & Trust Signals */}
      <div className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SecurityBadges />
            <TrustSignals />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact CTA */}
      <ContactCTA />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
