"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Enhanced Testimonials Section
const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      text: "QuillInsight has revolutionized how I handle meeting notes. The AI summaries save me hours every week.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Graduate Student",
      company: "MIT",
      text: "The auto-tagging feature is incredible. My research notes are finally organized in a way that makes sense.",
      rating: 5,
      avatar: "MJ",
    },
    {
      name: "Elena Rodriguez",
      role: "UX Researcher",
      company: "Design Studio",
      text: "Highlight extraction helps me identify key insights from user interviews instantly. Game changer!",
      rating: 5,
      avatar: "ER",
    },
  ];

  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Loved by thousands worldwide
          </h2>
          <p className="text-xl text-muted-foreground">
            Join professionals and students who've transformed their note-taking
            workflow.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-8 bg-background/80 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand/20 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center font-semibold text-brand">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
