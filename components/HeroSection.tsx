"use client";
import { motion } from "framer-motion";
import { Feather, PlayCircle } from "lucide-react";

const HeroSection: React.FC = () => (
  <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-12 bg-background max-w-4xl mx-auto w-full">
    {/* Left: Headline & CTAs */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex-1 flex flex-col items-start justify-center max-w-xl"
    >
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
        Turn Your Notes into Insights.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8">
        QuillInsight helps you capture, organize, and extract powerful insights
        from your thoughts instantly.
      </p>
      <div className="flex gap-4">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/auth/register"
          className="px-6 py-3 rounded-full bg-brand text-white font-semibold shadow hover:bg-brand-dark transition"
        >
          Start for Free
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#demo"
          className="px-6 py-3 rounded-full bg-surface text-brand font-semibold shadow flex items-center gap-2 border border-brand hover:bg-brand-light hover:text-white transition"
        >
          <PlayCircle className="w-5 h-5" />
          Watch Demo
        </motion.a>
      </div>
    </motion.div>

    {/* Right: Illustration */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex-1 flex items-center justify-center"
    >
      {/* Placeholder illustration: notes transforming into graphs/tags/insights */}
      <div className="relative w-[340px] h-[340px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-light to-brand-dark opacity-20 blur-lg" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="bg-surface rounded-xl shadow-lg p-6 flex flex-col items-start w-[220px]">
            <span className="font-heading font-semibold text-lg mb-2">
              My Meeting Notes
            </span>
            <span className="text-sm text-muted-foreground">
              Discuss project roadmap, assign tasks...
            </span>
          </div>
          <div className="flex gap-4">
            <div className="bg-brand text-white rounded-full px-4 py-2 text-sm font-semibold shadow flex items-center gap-2">
              <Feather className="w-4 h-4" />
              #AI
            </div>
            <div className="bg-brand-light text-white rounded-full px-4 py-2 text-sm font-semibold shadow flex items-center gap-2">
              <Feather className="w-4 h-4" />
              #Insights
            </div>
          </div>
          <div className="bg-surface rounded-xl shadow-lg p-4 flex flex-col items-center w-[180px]">
            <span className="font-heading font-semibold text-base mb-1">
              Summary
            </span>
            <span className="text-xs text-muted-foreground text-center">
              Project roadmap defined. Tasks assigned to team members.
            </span>
            <div className="mt-2 w-full h-2 bg-brand-light rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  </main>
);

export default HeroSection;
