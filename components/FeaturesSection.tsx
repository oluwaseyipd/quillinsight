"use client";
import { motion } from "framer-motion";
import { Brain, Tags, Zap, Search } from "lucide-react";

// Enhanced Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Summaries",
      description:
        "AI distills lengthy notes into concise, actionable summaries automatically.",
      color: "text-blue-500",
    },
    {
      icon: <Tags className="w-8 h-8" />,
      title: "Auto-Tagging",
      description:
        "Intelligent categorization keeps your notes organized without manual effort.",
      color: "text-purple-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Insights",
      description:
        "Extract key points and action items from any note in seconds.",
      color: "text-yellow-500",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Search",
      description:
        "Find anything across all your notes with AI-powered semantic search.",
      color: "text-green-500",
    },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Why Choose QuillInsight?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI features designed to transform how you capture and
            process information.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group p-8 bg-surface/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand/20 transition-all duration-300"
            >
              <div
                className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-brand transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
