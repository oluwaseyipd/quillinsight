// components/pricing/ContactCTA.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MessageSquare, Phone, Mail } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent text-white">
              Ready to Transform Your Note-Taking?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Join 10,000+ professionals who've revolutionized their workflow
            </h2>
            <p className="text-xl text-text/70 mb-8 max-w-2xl mx-auto">
              Start your free trial today and discover how AI can make your
              notes more insightful, organized, and actionable than ever before.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Demo
              </Button>
            </div>

            <p className="text-sm text-text/50">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-text/60 mb-4">
                  Get instant answers from our support team
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Start Chat
                </Button>
                <p className="text-xs text-green-600 mt-2">
                  Usually responds in ~2 min
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Schedule Demo</h3>
                <p className="text-sm text-text/60 mb-4">
                  See QuillInsight in action with a personal walkthrough
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Book Demo
                </Button>
                <p className="text-xs text-text/50 mt-2">
                  15-minute personalized demo
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Sales Call</h3>
                <p className="text-sm text-text/60 mb-4">
                  Speak with our sales team about Enterprise needs
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Call Sales
                </Button>
                <p className="text-xs text-text/50 mt-2">
                  Enterprise solutions specialist
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-text/60 mb-4">
                  Send us your questions and we'll respond quickly
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Email Us
                </Button>
                <p className="text-xs text-text/50 mt-2">
                  Response within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Final Trust Signals */}
          <div className="mt-16 p-8 bg-surface/50 rounded-2xl border border-surface">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold mb-4">Join the Community</h3>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">
                      95%
                    </span>
                  </div>
                  <span className="text-text/70">Customer Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">
                      10K+
                    </span>
                  </div>
                  <span className="text-text/70">Active Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">
                      500K+
                    </span>
                  </div>
                  <span className="text-text/70">Notes Created</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-xs">
                      4.9
                    </span>
                  </div>
                  <span className="text-text/70">App Store Rating</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-medium text-text mb-2">
                  🏆 Y Combinator S23
                </div>
                <p className="text-sm text-text/60">
                  Backed by the world's most successful startup accelerator
                </p>
              </div>
              <div>
                <div className="font-medium text-text mb-2">
                  🔒 SOC 2 Compliant
                </div>
                <p className="text-sm text-text/60">
                  Enterprise-grade security you can trust
                </p>
              </div>
              <div>
                <div className="font-medium text-text mb-2">
                  📰 Featured in TechCrunch
                </div>
                <p className="text-sm text-text/60">
                  Recognized by leading tech publications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
