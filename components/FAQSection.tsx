"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AI summarization work?",
      answer:
        "Our AI analyzes your notes using advanced natural language processing to identify key themes, important details, and actionable items. It then generates concise summaries that capture the essence of your content while maintaining context and meaning.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely. We use enterprise-grade encryption for all data transmission and storage. Your notes are encrypted both in transit and at rest, and we never share your personal data with third parties. You maintain full ownership and control of your content.",
    },
    {
      question: "Can I export my notes?",
      answer:
        "Yes! You can export your notes in multiple formats including PDF, Markdown, and JSON. We believe in data portability and ensure you're never locked into our platform. Your data belongs to you.",
    },
    {
      question: "What's included in the free plan?",
      answer:
        "The free plan includes up to 50 notes, basic AI summaries, auto-tagging, web access, and community support. It's perfect for trying out QuillInsight and seeing how AI can enhance your note-taking workflow.",
    },
    {
      question: "How accurate is the AI tagging?",
      answer:
        "Our AI tagging system is highly accurate, correctly identifying relevant tags about 95% of the time. The system learns from your usage patterns and improves over time. You can always manually adjust or add tags as needed.",
    },
    {
      question: "Can I collaborate with my team?",
      answer:
        "Yes! Pro and Enterprise plans include team collaboration features. You can share notes, create team workspaces, and collaborate in real-time. Enterprise plans offer additional features like admin controls and advanced permissions.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about QuillInsight
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-4"
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-surface/50 rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-brand/5 transition-colors"
              >
                <h3 className="font-heading font-semibold text-lg pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === idx ? "auto" : 0,
                  opacity: openIndex === idx ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
