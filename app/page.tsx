"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoPreviewSection from "@/components/DemoPreviewSection";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

// Main Homepage Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DemoPreviewSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
