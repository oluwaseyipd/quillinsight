// app/contact/page.tsx
import { Metadata } from "next";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import {
  ContactHero,
  SupportFeatures,
  ContactMethods,
  ContactForm,
  SupportLevels,
  OfficeLocations,
  ContactCTA,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us - QuillInsight | Get Support & Sales Help",
  description:
    "Get in touch with QuillInsight support team. Contact sales, get technical support, or schedule a demo for your team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <ContactHero />

      {/* Support Features */}
      <SupportFeatures />

      {/* Contact Methods */}
      <ContactMethods />

      {/* Contact Form */}
      <ContactForm />

      {/* Support Levels */}
      <SupportLevels />

      {/* Office Locations */}
      <OfficeLocations />

      {/* CTA Section */}
      <ContactCTA />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
