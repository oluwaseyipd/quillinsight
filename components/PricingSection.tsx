"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

// Pricing Section

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI note-taking",
      features: [
        "Up to 50 notes",
        "Basic AI summaries",
        "Auto-tagging",
        "Web access",
        "Community support",
      ],
      cta: "Start Free",
      popular: false,
      ctaLink: "/auth/register",
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "For professionals who need advanced AI features",
      features: [
        "Unlimited notes",
        "Advanced AI summaries",
        "Smart search",
        "Priority support",
        "Team collaboration",
        "API access",
        "Custom tags",
      ],
      cta: "Start Pro Trial",
      popular: true,
      ctaLink: "/auth/register?plan=pro",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations at scale",
      features: [
        "Everything in Pro",
        "SSO integration",
        "Advanced analytics",
        "Priority processing",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
      ctaLink: "/contact-sales",
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
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free, upgrade when
            you're ready.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "border-brand bg-brand/5 scale-105"
                  : "border-white/10 bg-background/50 hover:border-brand/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-brand text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-heading font-bold text-2xl mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period !== "pricing" && (
                    <span className="text-muted-foreground">
                      {" "}
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={plan.ctaLink}
                className={`block w-full py-3 rounded-full font-semibold text-center transition-all duration-200 ${
                  plan.popular
                    ? "bg-brand text-white hover:bg-brand-dark shadow-lg"
                    : "bg-surface text-brand border border-brand/20 hover:bg-brand/5"
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
