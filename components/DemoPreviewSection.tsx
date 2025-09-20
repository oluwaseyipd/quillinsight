"use client";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Brain,
  Tags,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

// Demo Preview Section
const DemoPreviewSection = () => (
  <section className="relative py-24 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

    <div className="relative z-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
          Your Second Brain, Powered by AI
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Watch how QuillInsight transforms chaotic notes into structured,
          actionable insights in real-time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-4xl"
      >
        {/* Browser mockup */}
        <div className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Browser header */}
          <div className="flex items-center justify-between px-6 py-4 bg-surface/50 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-background/50 rounded-full px-4 py-2 text-sm text-muted-foreground text-center max-w-md mx-auto">
                quillinsight.com/dashboard/note/1234567890
              </div>
            </div>
            <div className="w-16" />
          </div>

          {/* Demo content */}
          <div className="p-8 space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input side */}
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand" />
                  Raw Notes
                </h3>
                <div className="bg-background/50 rounded-xl p-4 border border-white/5 min-h-[200px]">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Meeting with product team - discussed new feature roadmap
                    </p>
                    <p>
                      Key priorities: mobile optimization, user onboarding flow,
                      analytics dashboard
                    </p>
                    <p>
                      Timeline: Q1 for mobile, Q2 for onboarding, Q3 for
                      analytics
                    </p>
                    <p>
                      Budget constraints: $50k allocated, need to prioritize
                      mobile first
                    </p>
                    <p>
                      Team assignments: Sarah - mobile, Mike - onboarding, Lisa
                      - analytics
                    </p>
                    <p>
                      Next steps: create detailed specs, setup project tracking,
                      weekly check-ins
                    </p>
                  </div>
                </div>
              </div>

              {/* Output side */}
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  AI-Enhanced Insights
                </h3>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-brand/5 rounded-xl p-4 border border-brand/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-brand" />
                    <span className="text-sm font-semibold text-brand">
                      Smart Summary
                    </span>
                  </div>
                  <p className="text-sm text-brand-dark leading-relaxed">
                    Product roadmap meeting established Q1-Q3 priorities: mobile
                    optimization ($50k, Q1), user onboarding (Q2), and analytics
                    dashboard (Q3). Team assignments finalized.
                  </p>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Tags className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold">
                      Auto-Generated Tags
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      #roadmap
                    </span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      #mobile
                    </span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      #budget
                    </span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      #team-meeting
                    </span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      #Q1-Q3
                    </span>
                  </div>
                </motion.div>

                {/* Key insights */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      Action Items
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>• Create detailed specs for mobile optimization</li>
                    <li>• Set up project tracking system</li>
                    <li>• Schedule weekly check-ins with team</li>
                    <li>• Prioritize mobile development for Q1 budget</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-24 h-24 bg-brand/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/auth/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-surface text-brand font-semibold border border-brand/20 hover:border-brand/40 hover:bg-brand/5 transition-all duration-200"
        >
          Try it yourself
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default DemoPreviewSection;
