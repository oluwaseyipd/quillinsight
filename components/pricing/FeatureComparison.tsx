// components/pricing/FeatureComparison.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const featureCategories = [
  {
    name: "Core Features",
    features: [
      {
        name: "Notes Creation & Editing",
        description: "Create and edit rich text notes",
        free: true,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Folders & Organization",
        description: "Organize notes in folders",
        free: "3 folders",
        pro: "Unlimited",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Monthly Note Limit",
        description: "Number of notes you can create per month",
        free: "10 notes",
        pro: "Unlimited",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Search & Filtering",
        description: "Find notes quickly with search",
        free: "Basic search",
        pro: "Advanced search",
        business: "Advanced search",
        enterprise: "AI-powered search",
      },
    ],
  },
  {
    name: "AI Features",
    features: [
      {
        name: "AI Summarization",
        description: "Generate concise summaries of your notes",
        free: "Basic (5/month)",
        pro: "Advanced (Unlimited)",
        business: "Advanced (Unlimited)",
        enterprise: "Custom AI Models",
      },
      {
        name: "Auto-tagging",
        description: "Automatically suggest relevant tags",
        free: false,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Key Insights Extraction",
        description: "Identify key points and action items",
        free: false,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Smart Connections",
        description: "Find related notes automatically",
        free: false,
        pro: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    name: "Collaboration",
    features: [
      {
        name: "Team Members",
        description: "Number of team members included",
        free: "1 user",
        pro: "5 users",
        business: "25 users",
        enterprise: "Unlimited",
      },
      {
        name: "Note Sharing",
        description: "Share notes with others",
        free: false,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Real-time Collaboration",
        description: "Collaborate on notes in real-time",
        free: false,
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Admin Dashboard",
        description: "Manage team members and permissions",
        free: false,
        pro: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    name: "Export & Integration",
    features: [
      {
        name: "Export Options",
        description: "Export your notes in various formats",
        free: false,
        pro: "PDF, Markdown",
        business: "PDF, Markdown, Word",
        enterprise: "All formats + Custom",
      },
      {
        name: "API Access",
        description: "Access your data via REST API",
        free: false,
        pro: false,
        business: "Limited",
        enterprise: "Full API access",
      },
      {
        name: "Integrations",
        description: "Connect with other tools",
        free: false,
        pro: "Basic integrations",
        business: "Advanced integrations",
        enterprise: "Custom integrations",
      },
    ],
  },
  {
    name: "Security & Support",
    features: [
      {
        name: "Data Encryption",
        description: "Your data is encrypted at rest and in transit",
        free: true,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        name: "SSO Integration",
        description: "Single Sign-On with your organization",
        free: false,
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Support Level",
        description: "Level of customer support provided",
        free: "Community",
        pro: "Email (24h)",
        business: "Priority (4h)",
        enterprise: "24/7 Phone + Dedicated AM",
      },
      {
        name: "SLA",
        description: "Service Level Agreement",
        free: "Best effort",
        pro: "99.5% uptime",
        business: "99.9% uptime",
        enterprise: "99.95% uptime + Custom SLA",
      },
    ],
  },
];

const plans = ["Free", "Pro", "Business", "Enterprise"];

export function FeatureComparison() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const displayedCategories = showAllFeatures
    ? featureCategories
    : featureCategories.slice(0, 2);

  const renderFeatureValue = (value: any) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    }
    if (value === false) {
      return <X className="w-5 h-5 text-red-300 mx-auto" />;
    }
    return <span className="text-sm text-center block">{value}</span>;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Compare Plans & Features
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include our core
            note-taking features with different levels of AI capabilities and
            team collaboration.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header */}
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left p-6 min-w-[300px]">
                      <span className="font-semibold text-lg">Features</span>
                    </th>
                    {plans.map((plan) => (
                      <th key={plan} className="text-center p-6 min-w-[150px]">
                        <div className="font-semibold text-lg">{plan}</div>
                        {plan === "Pro" && (
                          <div className="text-xs text-accent mt-1 font-normal">
                            Most Popular
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Feature Categories */}
                <tbody>
                  {displayedCategories.map((category, categoryIndex) => (
                    <>
                      {/* Category Header */}
                      <tr
                        key={`${category.name}-header`}
                        className="bg-surface/50"
                      >
                        <td colSpan={5} className="p-4">
                          <h3 className="font-semibold text-text">
                            {category.name}
                          </h3>
                        </td>
                      </tr>

                      {/* Category Features */}
                      {category.features.map((feature, featureIndex) => (
                        <tr
                          key={`${category.name}-${feature.name}`}
                          className={
                            featureIndex % 2 === 0
                              ? "bg-background"
                              : "bg-surface/20"
                          }
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {feature.name}
                              </span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="w-4 h-4 text-text/40" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      {feature.description}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.free)}
                          </td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.pro)}
                          </td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.business)}
                          </td>
                          <td className="p-4 text-center">
                            {renderFeatureValue(feature.enterprise)}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Show More/Less Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowAllFeatures(!showAllFeatures)}
          >
            {showAllFeatures ? "Show Less Features" : "Show All Features"}
          </Button>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-accent/5 rounded-xl border border-accent/20">
          <h3 className="text-xl font-bold mb-4">
            Still have questions about our features?
          </h3>
          <p className="text-text/60 mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your needs.
            Get a personalized demo or speak with our specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Book a Demo</Button>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
