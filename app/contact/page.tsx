// app/contact/page.tsx
import { Metadata } from "next";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Headphones,
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - QuillInsight | Get Support & Sales Help",
  description:
    "Get in touch with QuillInsight support team. Contact sales, get technical support, or schedule a demo for your team.",
};

const contactMethods = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Live Chat",
    description: "Get instant help from our support team",
    details: "Available 24/7 for Pro and Business users",
    action: "Start Chat",
    primary: true,
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Support",
    description: "Detailed help via email",
    details: "support@quillinsight.com",
    action: "Send Email",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone Support",
    description: "Speak directly with our team",
    details: "+1 (555) 123-QUILL",
    action: "Call Now",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Schedule Demo",
    description: "Personal walkthrough with our experts",
    details: "30-minute guided tour",
    action: "Book Demo",
  },
];

const supportLevels = [
  {
    plan: "Free",
    responseTime: "48-72 hours",
    channels: ["Community Forum", "Email"],
    features: ["Self-service help center", "Community support"],
  },
  {
    plan: "Pro",
    responseTime: "24 hours",
    channels: ["Email", "Live Chat", "Priority Support"],
    features: ["Email support", "Live chat", "Video tutorials"],
  },
  {
    plan: "Business",
    responseTime: "4 hours",
    channels: ["Email", "Live Chat", "Phone", "Dedicated Manager"],
    features: ["Priority support", "Phone support", "Account manager"],
  },
  {
    plan: "Enterprise",
    responseTime: "1 hour",
    channels: ["All channels", "Dedicated Team", "24/7 Support"],
    features: ["White-glove support", "Custom training", "SLA guarantee"],
  },
];

const officeLocations = [
  {
    city: "San Francisco",
    address: "123 Innovation Drive, Suite 400",
    phone: "+1 (415) 555-0123",
    timezone: "PST",
  },
  {
    city: "New York",
    address: "456 Business Plaza, 25th Floor",
    phone: "+1 (212) 555-0456",
    timezone: "EST",
  },
  {
    city: "London",
    address: "78 Tech Street, Central London",
    phone: "+44 20 7123 4567",
    timezone: "GMT",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-surface to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent">
            We're Here to Help
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-brand via-accent to-brand bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-text/70 max-w-3xl mx-auto mb-8">
            Whether you need support, want to explore our features, or discuss enterprise solutions,
            our team is ready to help you succeed with QuillInsight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand hover:bg-brand-dark">
              Start Live Chat
              <MessageSquare className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Choose How to Connect
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Multiple ways to get the help you need, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-300 ${
                  method.primary ? "ring-2 ring-brand/20 shadow-lg" : ""
                }`}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                    method.primary ? "bg-brand text-white" : "bg-accent/10 text-accent"
                  }`}>
                    {method.icon}
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-text/70 mb-2">{method.description}</p>
                  <p className="text-sm text-text/60 mb-4">{method.details}</p>
                  <Button
                    variant={method.primary ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold font-heading mb-6">
                  Send us a Message
                </h2>
                <p className="text-text/70 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input type="email" placeholder="john@company.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input placeholder="Your Company" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input placeholder="How can we help?" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us about your question or how we can help..."
                      rows={5}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <label className="text-sm text-text/70">
                      I agree to receive marketing communications from QuillInsight.
                      You can unsubscribe at any time.
                    </label>
                  </div>

                  <Button size="lg" className="w-full bg-brand hover:bg-brand-dark">
                    Send Message
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Support Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text/70">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text/70">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text/70">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <Separator />
                    <div className="text-sm text-text/60">
                      Live chat available 24/7 for Pro and Business users
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Why Choose Our Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">95% satisfaction rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Average 4-hour response time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Expert technical knowledge</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Multi-language support</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="w-5 h-5" />
                      Emergency Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text/70 mb-2">
                      For critical issues affecting your business operations
                    </p>
                    <p className="font-medium">+1 (555) URGENT-1</p>
                    <p className="text-sm text-text/60">Available for Business and Enterprise customers</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Levels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Support by Plan
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Different levels of support to match your needs and plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportLevels.map((level, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">{level.plan}</CardTitle>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand">
                      {level.responseTime}
                    </div>
                    <div className="text-sm text-text/60">response time</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-sm mb-2">Channels:</div>
                      <div className="space-y-1">
                        {level.channels.map((channel, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-text/70">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {channel}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-2">Features:</div>
                      <div className="space-y-1">
                        {level.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-text/70">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Global presence with local expertise in major business hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mx-auto mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <CardTitle>{office.city}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-text/70">{office.address}</p>
                  <p className="font-medium">{office.phone}</p>
                  <p className="text-sm text-text/60">{office.timezone}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-text/70 mb-4">
              Looking for a location near you?
            </p>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Find Regional Partners
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand via-brand-dark to-brand">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who trust QuillInsight for their note-taking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-brand hover:bg-white/90"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
