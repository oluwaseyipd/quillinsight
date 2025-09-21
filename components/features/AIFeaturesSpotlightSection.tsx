// components/features/AIFeaturesSpotlightSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap } from "lucide-react";

export default function AIFeaturesSpotlightSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-brand/5 via-accent/5 to-brand/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand/10 text-brand">
              AI-Powered Intelligence
            </Badge>
            <h2 className="text-4xl font-bold font-heading mb-4 text-text">
              Your AI Writing Assistant
            </h2>
            <p className="text-xl text-text/70">
              Experience the future of note-taking with our advanced AI features
              that understand context, extract insights, and help you work
              smarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-surface/50 backdrop-blur-sm border-0">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-3">
                  <Brain className="w-6 h-6" />
                </div>
                <CardTitle className="text-text">Smart Summarization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text/70 mb-4">
                  Get intelligent summaries that capture the essence of your
                  notes, helping you quickly review and share key information.
                </p>
                <Button variant="outline" size="sm">
                  Try It Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-surface/50 backdrop-blur-sm border-0">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-3">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-text">Instant Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text/70 mb-4">
                  Discover patterns, connections, and actionable insights from
                  your notes with AI-powered analysis.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
