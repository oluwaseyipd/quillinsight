// components/contact/ContactForm.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Star,
  Headphones,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function ContactForm() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6 text-text">
                Send us a Message
              </h2>
              <p className="text-text/70 mb-8 text-lg">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text">
                      First Name *
                    </label>
                    <Input
                      placeholder="John"
                      className="bg-surface border-text/20 focus:border-brand focus:ring-brand/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text">
                      Last Name *
                    </label>
                    <Input
                      placeholder="Doe"
                      className="bg-surface border-text/20 focus:border-brand focus:ring-brand/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    className="bg-surface border-text/20 focus:border-brand focus:ring-brand/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text">
                    Company
                  </label>
                  <Input
                    placeholder="Your Company"
                    className="bg-surface border-text/20 focus:border-brand focus:ring-brand/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text">
                    Subject *
                  </label>
                  <Input
                    placeholder="How can we help?"
                    className="bg-surface border-text/20 focus:border-brand focus:ring-brand/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text">
                    Message *
                  </label>
                  <Textarea
                    placeholder="Tell us about your question or how we can help..."
                    rows={5}
                    className="bg-surface border-text/20 focus:border-brand focus:ring-brand/20"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 accent-brand" />
                  <label className="text-sm text-text/70">
                    I agree to receive marketing communications from
                    QuillInsight. You can unsubscribe at any time.
                  </label>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-brand hover:bg-brand-dark text-white py-4 text-lg"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-surface border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-text">
                    <Clock className="w-5 h-5 text-brand" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text/70">Monday - Friday</span>
                    <span className="font-medium text-text">
                      9:00 AM - 6:00 PM PST
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text/70">Saturday</span>
                    <span className="font-medium text-text">
                      10:00 AM - 4:00 PM PST
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text/70">Sunday</span>
                    <span className="font-medium text-text">Closed</span>
                  </div>
                  <Separator className="bg-text/20" />
                  <div className="text-sm text-accent bg-accent/10 px-3 py-2 rounded-lg">
                    💬 Live chat available 24/7 for Pro and Business users
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-text">
                    <Star className="w-5 h-5 text-accent" />
                    Why Choose Our Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand" />
                    <span className="text-sm text-text/70">
                      95% satisfaction rate
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand" />
                    <span className="text-sm text-text/70">
                      Average 4-hour response time
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand" />
                    <span className="text-sm text-text/70">
                      Expert technical knowledge
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand" />
                    <span className="text-sm text-text/70">
                      Multi-language support
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand/10 to-accent/10 border-brand/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-text">
                    <Headphones className="w-5 h-5 text-brand" />
                    Emergency Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text/70 mb-2">
                    For critical issues affecting your business operations
                  </p>
                  <p className="font-bold text-brand text-lg">
                    +1 (555) URGENT-1
                  </p>
                  <p className="text-sm text-text/70">
                    Available for Business and Enterprise customers
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
