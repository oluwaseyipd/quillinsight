// app/features/page.tsx
import { Metadata } from "next";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  FileText,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Search,
  Users,
  BarChart3,
  Sparkles,
  Tag,
  FolderOpen,
  Clock,
  Download,
  Palette,
  Lock,
  RefreshCw,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features - QuillInsight | AI-Powered Note Taking",
  description:
    "Discover all the powerful features that make QuillInsight the ultimate AI-powered note-taking solution for professionals and teams.",
};

const coreFeatures = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Summarization",
    description:
      "Get instant, intelligent summaries of your notes with advanced AI that understands context and extracts key insights.",
    highlights: ["Context-aware", "Multi-language support", "Custom length"],
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Smart Auto-Tagging",
    description:
      "Never manually tag notes again. Our AI automatically categorizes and tags your content for effortless organization.",
    highlights: ["Auto-categorization", "Custom tags", "Bulk operations"],
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Semantic Search",
    description:
      "Find what you're looking for with AI-powered search that understands meaning, not just keywords.",
    highlights: ["Natural language", "Cross-references", "Instant results"],
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Rich Text Editor",
    description:
      "Write with a beautiful, distraction-free editor that supports markdown, formatting, and collaborative editing.",
    highlights: ["Markdown support", "Real-time sync", "Version history"],
  },
  {
    icon: <FolderOpen className="w-8 h-8" />,
    title: "Smart Organization",
    description:
      "Organize notes with folders, tags, and AI-suggested categories that adapt to your workflow.",
    highlights: ["Nested folders", "Smart suggestions", "Quick access"],
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Collaboration",
    description:
      "Share notes, collaborate in real-time, and manage team knowledge with advanced permission controls.",
    highlights: ["Real-time editing", "Permission levels", "Team spaces"],
  },
];

const advancedFeatures = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics & Insights",
    description: "Track your writing patterns and productivity with detailed analytics.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Multi-Platform Sync",
    description: "Access your notes anywhere with seamless sync across all devices.",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Export & Backup",
    description: "Export to multiple formats and automatic cloud backups.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Customizable Themes",
    description: "Personalize your workspace with themes and layout options.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Encryption",
    description: "Your notes are encrypted and secure with zero-knowledge architecture.",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Version History",
    description: "Never lose work with automatic version control and restoration.",
  },
];

const integrations = [
  { name: "Notion", logo: "📝" },
  { name: "Google Drive", logo: "📁" },
  { name: "Slack", logo: "💬" },
  { name: "Trello", logo: "📋" },
  { name: "Zapier", logo: "⚡" },
  { name: "GitHub", logo: "🐙" },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
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

      {/* Core Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Core Features
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              The essential tools that make QuillInsight the most powerful
              note-taking app for modern professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:border-accent/20"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text/70 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-text/60"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Professional-grade features for power users and teams who demand
              more from their note-taking solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-text/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Spotlight */}
      <section className="py-20 bg-gradient-to-r from-brand/5 via-accent/5 to-brand/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-brand/10 text-brand">
                AI-Powered Intelligence
              </Badge>
              <h2 className="text-4xl font-bold font-heading mb-4">
                Your AI Writing Assistant
              </h2>
              <p className="text-xl text-text/70">
                Experience the future of note-taking with our advanced AI
                features that understand context, extract insights, and help you
                work smarter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-3">
                    <Brain className="w-6 h-6" />
                  </div>
                  <CardTitle>Smart Summarization</CardTitle>
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

              <Card className="bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-3">
                    <Zap className="w-6 h-6" />
                  </div>
                  <CardTitle>Instant Insights</CardTitle>
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

      {/* Integrations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Connect QuillInsight with your favorite tools and workflows for a
              truly integrated experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {integrations.map((integration, index) => (
              <Card
                key={index}
                className="w-32 h-32 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-2">{integration.logo}</div>
                <div className="font-medium text-sm">{integration.name}</div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-text/70 mb-6">
              Plus hundreds more through our API and webhook integrations
            </p>
            <Button variant="outline">
              View All Integrations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand via-brand-dark to-brand">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Note-Taking?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have already discovered the
            power of AI-enhanced note-taking with QuillInsight.
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
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
