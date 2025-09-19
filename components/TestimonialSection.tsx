"use client";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * TestimonialSection
 * Homepage section: "Loved by learners, trusted by professionals."
 * - Grid of 3 testimonial cards with avatar, name/role, and testimonial text
 * - Staggered fade-in animation
 */
const testimonials = [
  {
    avatar: "/avatar1.png",
    name: "Jane Doe",
    role: "Product Manager",
    text:
      "QuillInsight makes it so easy to turn my meeting notes into actionable summaries. I save hours every week!",
  },
  {
    avatar: "/avatar2.png",
    name: "Alex Kim",
    role: "Student",
    text:
      "Auto-tagging keeps my notes organized without any effort. QuillInsight is my study partner!",
  },
  {
    avatar: "/avatar3.png",
    name: "Maria Lopez",
    role: "Researcher",
    text:
      "Highlight extraction is a game changer. I can focus on what matters most in my research notes.",
  },
];

export default function TestimonialSection() {
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
          Loved by learners, trusted by professionals.
        </h2>
        <p className="text-lg text-muted-foreground">
          See what our users are saying about QuillInsight.
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-surface rounded-xl shadow-lg p-7 flex flex-col items-center text-center transition-all"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={64}
              height={64}
              className="rounded-full mb-4 object-cover"
            />
            <span className="font-heading font-semibold text-base mb-1">
              {t.name}
            </span>
            <span className="text-xs text-muted-foreground mb-3">
              {t.role}
            </span>
            <p className="text-sm text-muted-foreground">{`“${t.text}”`}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
