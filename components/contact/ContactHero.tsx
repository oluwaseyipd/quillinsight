// components/contact/ContactHero.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-background via-surface to-background">
      <div className="container mx-auto px-4 text-center">
        <Badge
          variant="secondary"
          className="mb-6 bg-brand/10 text-brand border-brand/20"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          We're Here to Help
        </Badge>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 bg-gradient-to-r from-brand via-accent to-brand bg-clip-text text-transparent leading-tight">
          Get in Touch
        </h1>
        <p className="text-xl lg:text-2xl text-text/70 max-w-4xl mx-auto mb-10 leading-relaxed">
          Whether you need support, want to explore our features, or discuss
          enterprise solutions, our team is ready to help you succeed with
          QuillInsight.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-brand hover:bg-brand-dark text-white px-8 py-4 text-lg"
          >
            Start Live Chat
            <MessageSquare className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-brand text-brand hover:bg-brand/10 px-8 py-4 text-lg"
          >
            Schedule Demo
            <Calendar className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
