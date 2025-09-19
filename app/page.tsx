"use client";

import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoPreviewSection from "@/components/DemoPreviewSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import { Feather } from "lucide-react";

export default function Home() {
  return (
    <div className="theme-classic min-h-screen bg-background text-text font-sans flex flex-col">
      {/* Header / Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between shadow-sm bg-surface">
        <div className="flex items-center gap-2">
          <Feather className="text-brand h-7 w-7" />
          <span className="font-heading text-xl font-bold tracking-tight text-brand">
            QuillInsight
          </span>
        </div>
        <nav className="hidden md:flex gap-8 items-center text-base font-medium">
          <a href="#features" className="hover:text-accent transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-accent transition">
            Pricing
          </a>
          <a href="#faqs" className="hover:text-accent transition">
            Faqs
          </a>
          <a href="#contact" className="hover:text-accent transition">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/auth/login"
            className="px-5 py-2 rounded-full bg-surface text-brand font-semibold shadow border border-brand hover:bg-brand-light hover:text-white transition hidden md:inline-block"
          >
            Sign in
          </a>
          <a
            href="/auth/register"
            className="px-5 py-2 rounded-full bg-brand text-white font-semibold shadow hover:bg-brand-dark transition hidden md:inline-block"
          >
            Get Started
          </a>
        </div>
      </header>

      <HeroSection />
      <FeaturesSection />
      <DemoPreviewSection />
      <TestimonialSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
