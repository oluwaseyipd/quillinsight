// components/pricing/TrustSignals.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Phone, Download, RefreshCw, Users, Award } from "lucide-react";

const supportLevels = [
  {
    plan: "Free",
    response: "Community",
    channels: ["Community Forum"],
    hours: "Best Effort",
  },
  {
    plan: "Pro",
    response: "24 hours",
    channels: ["Email Support", "Knowledge Base"],
    hours: "Business Hours",
  },
  {
    plan: "Business",
    response: "4 hours",
    channels: ["Priority Email", "Live Chat", "Phone Support"],
    hours: "24/5 Coverage",
  },
  {
    plan: "Enterprise",
    response: "1 hour",
    channels: ["Dedicated Account Manager", "24/7 Phone", "Slack Connect"],
    hours: "24/7/365",
  },
];

const guarantees = [
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "30-Day Money Back",
    description: "Full refund if not satisfied",
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: "Data Portability",
    description: "Export your data anytime",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "No Long-Term Contracts",
    description: "Cancel or change plans anytime",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Grandfathering Policy",
    description: "Existing customers protected from price increases",
  },
];

const teamInfo = [
  {
    role: "Founded by",
    description: "Former Google AI researchers with 15+ years in ML",
  },
  {
    role: "Backed by",
    description: "Top-tier VCs including Andreessen Horowitz, Google Ventures",
  },
  {
    role: "Team size",
    description: "25+ AI experts, engineers, and product specialists",
  },
  {
    role: "Serving customers",
    description: "Since 2023 with 95% customer satisfaction rate",
  },
];

export function TrustSignals() {
  return (
    <div>
      <h3 className="text-2xl font-bold font-heading mb-8">
        World-Class Support & Reliability
      </h3>

      {/* Support Levels */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Support Response Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportLevels.map((level) => (
              <div
                key={level.plan}
                className="flex items-center justify-between p-4 rounded-lg bg-surface/50"
              >
                <div>
                  <div className="font-semibold text-text">{level.plan}</div>
                  <div className="text-sm text-text/60">
                    {level.channels.join(", ")}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {level.response}
                  </Badge>
                  <div className="text-xs text-text/60">{level.hours}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guarantees */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Risk-Free Guarantees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  {guarantee.icon}
                </div>
                <div>
                  <div className="font-medium text-text">{guarantee.title}</div>
                  <div className="text-sm text-text/60">
                    {guarantee.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team & Company Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            About QuillInsight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            {teamInfo.map((info) => (
              <div
                key={info.role}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <div className="font-medium text-text min-w-[120px]">
                  {info.role}:
                </div>
                <div className="text-text/70">{info.description}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="bg-blue-50 border-blue-200 text-blue-700"
            >
              YC S23 Batch
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-50 border-green-200 text-green-700"
            >
              SOC 2 Compliant
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-50 border-purple-200 text-purple-700"
            >
              Series A Funded
            </Badge>
          </div>

          <div className="mt-6 pt-6 border-t border-surface">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="sm">
                Meet the Team
              </Button>
              <Button variant="outline" size="sm">
                View Security Docs
              </Button>
              <Button variant="outline" size="sm">
                Read Our Story
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
