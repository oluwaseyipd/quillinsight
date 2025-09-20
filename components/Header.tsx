"use client";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

// Header Component
const Header = () => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="relative z-50 w-full px-6 py-6 flex items-center justify-between backdrop-blur-xl bg-background/80 border-b border-white/10"
  >
    <div className="flex items-center gap-3">
      <div className="relative">
        <Feather className="text-brand h-8 w-8" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
      </div>
      <span className="font-heading text-2xl font-bold tracking-tight text-brand">
        QuillInsight
      </span>
    </div>

    <nav className="hidden md:flex gap-8 items-center text-base font-medium">
      <a
        href="#features"
        className="hover:text-accent transition-colors duration-200"
      >
        Features
      </a>
      <a
        href="#pricing"
        className="hover:text-accent transition-colors duration-200"
      >
        Pricing
      </a>
      <a
        href="#faqs"
        className="hover:text-accent transition-colors duration-200"
      >
        FAQs
      </a>
      <a
        href="#contact"
        className="hover:text-accent transition-colors duration-200"
      >
        Contact
      </a>
    </nav>

    <div className="flex items-center gap-3">
      <a
        href="/auth/login"
        className="px-6 py-2.5 rounded-full text-text font-semibold hover:text-accent transition-colors duration-200 hidden md:inline-block"
      >
        Sign in
      </a>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="/auth/register"
        className="px-6 py-2.5 rounded-full bg-brand text-white font-semibold shadow-lg shadow-brand/25 hover:bg-brand-dark transition-all duration-200"
      >
        Get Started
      </motion.a>
    </div>
  </motion.header>
);

export default Header;
