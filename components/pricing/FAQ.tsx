// components/pricing/FAQ.tsx
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "You get full access to Pro features for 30 days without providing a credit card. After the trial, you can choose to upgrade or continue with our generous free plan.",
  },
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and we'll prorate any charges or credits.",
  },
  {
    question: "How secure is my data?",
    answer:
      "Extremely secure. We use AES-256 encryption, maintain SOC 2 compliance, and follow a zero-knowledge architecture where even we cannot access your unencrypted notes.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "We'll notify you before you hit any limits. For usage overages, we offer automatic upgrades or one-time top-ups rather than cutting off access to your data.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you're not satisfied for any reason, contact us within 30 days for a full refund.",
  },
  {
    question: "How does the AI summarization work?",
    answer:
      "Our AI analyzes your notes using advanced language models to extract key points, themes, and actionable insights. The more you use it, the better it understands your writing style.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Absolutely! You own your data and can export it anytime in multiple formats including PDF, Markdown, and JSON. No lock-in, ever.",
  },
  {
    question: "Is there a limit to note length?",
    answer:
      "Free users can create notes up to 10,000 characters. Pro and Business users have no limits. Enterprise customers can customize limits based on their needs.",
  },
  {
    question: "Do you offer volume discounts?",
    answer:
      "Yes! Business and Enterprise plans include volume discounts. Contact our sales team for custom pricing on larger deployments.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with popular tools like Notion, Slack, Google Drive, Dropbox, and more. Enterprise customers can request custom integrations.",
  },
];

const categories = [
  { name: "All", count: faqs.length },
  { name: "Billing", count: 4 },
  { name: "Features", count: 3 },
  { name: "Security", count: 2 },
  { name: "Technical", count: 1 },
];

export function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <section className="py-20 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            Got questions? We've got answers. Can't find what you're looking
            for? Our support team is here to help.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="rounded-full"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-surface rounded-lg px-6 py-2"
                  >
                    <AccordionTrigger className="text-left font-medium text-text hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-text/70 pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Still Have Questions?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-text/70 mb-6">
                Our support team is standing by to help you find the perfect
                solution for your note-taking needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Start Live Chat
                </Button>
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-accent/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-text/60">
                  <div>
                    <div className="font-medium text-text">
                      Average Response Time
                    </div>
                    <div>Pro: 24 hours | Business: 4 hours</div>
                  </div>
                  <div>
                    <div className="font-medium text-text">Support Hours</div>
                    <div>24/7 for Enterprise | 24/5 for Business</div>
                  </div>
                  <div>
                    <div className="font-medium text-text">
                      Satisfaction Rate
                    </div>
                    <div>95% of customers rate our support as excellent</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
