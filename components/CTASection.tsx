"use client";
import { motion } from "framer-motion";
import React from "react";
import { ArrowRight, CheckCircle, Users, Star } from "lucide-react";
import GridBackground from "@/components/GridBackground";

// Enhanced CTA Section
const CTASection = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative py-24 px-6 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-accent/5 to-brand-light/10" />
    <GridBackground />

    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
        Ready to transform your notes?
      </h2>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
        Join thousands of professionals and students who've already
        revolutionized their workflow with QuillInsight.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/auth/register"
          className="group px-8 py-4 rounded-full bg-brand text-white font-semibold shadow-xl shadow-brand/25 hover:bg-brand-dark transition-all duration-200 flex items-center justify-center gap-2"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#pricing"
          className="px-8 py-4 rounded-full bg-surface text-brand font-semibold border border-brand/20 hover:border-brand/40 transition-all duration-200"
        >
          View Pricing
        </motion.a>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          50k+ active users
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          4.9/5 rating
        </div>
      </div>
    </div>
  </motion.section>
);

export default CTASection;
