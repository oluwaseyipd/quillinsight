// components/pricing/PricingPlans.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Building } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for trying out AI-powered note-taking",
    badge: null,
    icon: null,
    features: [
      "10 notes per month",
      "Basic AI summarization",
      "3 folders",
      "Mobile & web access",
      "Community support",
    ],
    limitations: [
      "Limited AI features",
      "No auto-tagging",
      "No export options",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 12, annual: 120 },
    description: "For professionals who need advanced AI features",
    badge: "Most Popular",
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      "Unlimited notes",
      "Advanced AI summarization",
      "Auto-tagging & insights",
      "Unlimited folders",
      "Priority support",
      "Export to PDF/Markdown",
      "Advanced search",
      "Collaboration (5 users)",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: { monthly: 25, annual: 250 },
    description: "For teams that need collaboration and admin features",
    badge: "Best Value",
    icon: <Crown className="w-5 h-5" />,
    features: [
      "Everything in Pro",
      "Team collaboration (25 users)",
      "Admin dashboard",
      "Custom integrations",
      "API access",
      "Advanced analytics",
      "SSO integration",
      "Priority phone support",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", annual: "Custom" },
    description: "For large organizations with custom needs",
    badge: "Custom Solution",
    icon: <Building className="w-5 h-5" />,
    features: [
      "Everything in Business",
      "Unlimited users",
      "Dedicated account manager",
      "Custom AI training",
      "On-premise deployment",
      "Advanced security features",
      "Custom SLA",
      "24/7 phone support",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "annual",
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface rounded-full p-1 border">
            <Button
              variant={billingPeriod === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingPeriod("monthly")}
              className="rounded-full px-6"
            >
              Monthly
            </Button>
            <Button
              variant={billingPeriod === "annual" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingPeriod("annual")}
              className="rounded-full px-6"
            >
              Annual
              <Badge
                variant="secondary"
                className="ml-2 bg-green-100 text-green-700"
              >
                Save 17%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "border-accent shadow-lg scale-105 bg-accent/5"
                  : "border-surface hover:border-accent/30 transition-colors"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-white">{plan.badge}</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                {plan.icon && (
                  <div className="flex justify-center mb-2 text-accent">
                    {plan.icon}
                  </div>
                )}
                <CardTitle className="text-xl font-heading">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  {typeof plan.price[billingPeriod] === "number" ? (
                    <>
                      <span className="text-4xl font-bold text-text">
                        ${plan.price[billingPeriod]}
                      </span>
                      <span className="text-text/60">
                        /{billingPeriod === "monthly" ? "month" : "year"}
                      </span>
                      {billingPeriod === "annual" && plan.price.monthly > 0 && (
                        <div className="text-sm text-green-600 mt-1">
                          Save ${plan.price.monthly * 12 - plan.price.annual}
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-text">
                      {plan.price[billingPeriod]}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text/60 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-surface">
                    <p className="text-xs font-medium text-text/60 mb-2">
                      Limitations:
                    </p>
                    {plan.limitations.map((limitation) => (
                      <div
                        key={limitation}
                        className="text-xs text-text/50 mb-1"
                      >
                        • {limitation}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12 p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="text-green-700 font-medium mb-2">
            30-Day Money-Back Guarantee
          </div>
          <p className="text-sm text-green-600">
            Not satisfied? Get a full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
