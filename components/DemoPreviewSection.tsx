"use client";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * DemoPreviewSection
 * Homepage section showcasing a product mockup and CTA.
 * - Headline: "Your Second Brain, Powered by AI."
 * - Subtext: "See how QuillInsight transforms raw notes into meaningful insights."
 * - Responsive demo image (/public/demo.png)
 * - CTA: "Try it in 30 seconds →"
 * - Animation: Fade/slide/scale-in for mockup and CTA
 */
export default function DemoPreviewSection() {
  return (
    <section className="max-w-3xl mx-auto w-full px-6 py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Your Second Brain, Powered by AI.
        </h2>
        <p className="text-lg text-muted-foreground">
          See how QuillInsight transforms raw notes into meaningful insights.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex justify-center mb-8"
      >
        <Image
          src="/demo.png"
          alt="QuillInsight Demo Preview"
          width={600}
          height={360}
          className="rounded-2xl shadow-lg border bg-surface object-cover w-full max-w-xl h-auto"
          priority
        />
      </motion.div>
      <motion.a
        whileHover={{ scale: 1.05 }}
        href="/auth/register"
        className="px-6 py-3 rounded-full bg-surface text-brand font-semibold shadow border border-brand hover:bg-brand-light hover:text-white transition"
      >
        Try it in 30 seconds &rarr;
      </motion.a>
    </section>
  );
}
