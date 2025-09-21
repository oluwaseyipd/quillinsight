// components/features/FeaturesHero.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FeaturesHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-surface to-background">
      <div className="container mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent">
          Powered by Advanced AI
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-brand via-accent to-brand bg-clip-text text-transparent">
          Every Feature You Need
        </h1>
        <p className="text-xl text-text/70 max-w-3xl mx-auto mb-8">
          From AI-powered insights to seamless collaboration, QuillInsight
          combines the best of modern technology with intuitive design to
          revolutionize how you take and manage notes.
        </p>
        <Button size="lg" className="bg-brand hover:bg-brand-dark">
          Start Free Trial
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}
