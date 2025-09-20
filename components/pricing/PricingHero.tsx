// components/pricing/PricingHero.tsx
import { Badge } from "@/components/ui/badge";

export function PricingHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-surface to-background">
      <div className="container mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent">
          Trusted by 10,000+ professionals
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold font-heading text-text mb-6">
          Simple, Transparent Pricing
        </h1>

        <p className="text-xl text-text/70 mb-8 max-w-3xl mx-auto">
          Choose the perfect plan for your AI-powered note-taking needs. Start
          free, scale as you grow, with no hidden fees or surprises.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-text/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>30-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>99.9% uptime SLA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
