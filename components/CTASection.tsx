"use client";
import { motion } from "framer-motion";
import React from "react";

const CTASection: React.FC = () => (
  <motion.section
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full py-16 px-6 bg-gradient-to-br from-brand-light/30 via-brand/10 to-brand-dark/20 flex flex-col items-center justify-center"
  >
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-brand-dark">
        Ready to transform your notes?
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Join thousands of learners and professionals already using QuillInsight
        to boost productivity.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/auth/register"
          className="px-7 py-3 rounded-full bg-brand text-white font-semibold shadow hover:bg-brand-dark transition"
        >
          Get Started Free
        </a>
        <a
          href="#pricing"
          className="px-7 py-3 rounded-full bg-surface text-brand font-semibold shadow border border-brand hover:bg-brand-light hover:text-white transition"
        >
          View Pricing
        </a>
      </div>
    </div>
  </motion.section>
);

export default CTASection;
