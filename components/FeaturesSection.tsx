"use client";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

const features = [
  {
    icon: <Feather className="w-8 h-8 text-brand mb-3" />,
    title: "Smart Summaries",
    description: "Turn long notes into crisp, clear summaries instantly.",
  },
  {
    icon: <Feather className="w-8 h-8 text-brand mb-3" />,
    title: "Auto-Tagging",
    description: "Stay organized effortlessly with AI-generated tags.",
  },
  {
    icon: <Feather className="w-8 h-8 text-brand mb-3" />,
    title: "Highlight Extraction",
    description: "Extract the key ideas without lifting a finger.",
  },
  {
    icon: <Feather className="w-8 h-8 text-brand mb-3" />,
    title: "Cloud Sync",
    description: "Access your notes anywhere, on any device, securely.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="max-w-4xl mx-auto w-full px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Why Choose QuillInsight?
        </h2>
        <p className="text-lg text-muted-foreground">
          Smart AI features that make note-taking effortless and insightful.
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px rgba(107,77,230,0.12)",
            }}
            className="bg-surface rounded-xl shadow-lg p-6 flex flex-col items-center transition-all cursor-pointer"
          >
            {feature.icon}
            <h3 className="font-heading font-semibold text-lg mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
