// components/contact/ContactCTA.tsx
import { Button } from "@/components/ui/button";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-brand via-brand-dark to-brand relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-accent/90" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
          Join thousands of satisfied customers who trust QuillInsight for
          their note-taking needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-brand hover:bg-white/90 px-8 py-4 text-lg font-semibold"
          >
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
