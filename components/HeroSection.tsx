"use client";
import { motion } from "framer-motion";
import {
  Feather,
  PlayCircle,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Brain,
} from "lucide-react";
import FloatingOrb from "@/components/FloatingOrb";
import GridBackground from "@/components/GridBackground";

// Enhanced Hero Section
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
    <GridBackground />

    {/* Floating orbs */}
    <FloatingOrb size="w-64 h-64" color="bg-brand/5" delay={0} duration={25} />
    <FloatingOrb size="w-48 h-48" color="bg-accent/5" delay={5} duration={20} />
    <FloatingOrb
      size="w-32 h-32"
      color="bg-brand-light/5"
      delay={10}
      duration={30}
    />

    <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-brand/20 text-brand font-medium text-sm"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Note Taking
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight">
            Turn Your{" "}
            <span className="relative">
              <span className="relative z-10 text-brand">Notes</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-2 left-0 h-3 bg-brand/20 -z-10"
              />
            </span>{" "}
            into Insights
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
            QuillInsight transforms your scattered thoughts into organized,
            actionable insights using advanced AI.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/auth/register"
            className="group px-8 py-4 rounded-full bg-brand text-white font-semibold shadow-xl shadow-brand/25 hover:bg-brand-dark transition-all duration-200 flex items-center justify-center gap-2"
          >
            Start for Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#demo"
            className="group px-8 py-4 rounded-full bg-surface text-brand font-semibold border border-brand/20 hover:border-brand/40 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            Watch Demo
          </motion.a>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Free forever plan
          </div>
        </div>
      </motion.div>

      {/* Right: Interactive Demo */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        <div className="relative bg-surface/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-2xl">
          {/* Mock interface */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-lg">
                My Meeting Notes
              </h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-xl border border-white/5">
                <p className="text-sm text-muted-foreground">
                  Discussed Q4 roadmap priorities, assigned tasks to team
                  members, reviewed budget constraints and timeline
                  adjustments...
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="p-4 bg-brand/5 rounded-xl border border-brand/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-brand" />
                  <span className="text-sm font-semibold text-brand">
                    AI Summary
                  </span>
                </div>
                <p className="text-sm text-brand-dark">
                  Key decisions: Q4 priorities set, tasks assigned, budget
                  reviewed.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex gap-2 flex-wrap"
              >
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  #roadmap
                </span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  #budget
                </span>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  #tasks
                </span>
              </motion.div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand/20 via-accent/20 to-brand-light/20 rounded-3xl blur-lg -z-10 opacity-70" />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
