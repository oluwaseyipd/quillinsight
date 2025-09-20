// components/pricing/SecurityBadges.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Globe, Server, Key } from "lucide-react";

const securityFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "SOC 2 Type II Compliant",
    description: "Independently audited security controls and procedures",
    badge: "Certified",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Encryption",
    description: "AES-256 encryption for data at rest and in transit",
    badge: "Military Grade",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "GDPR & CCPA Ready",
    description: "Full compliance with global privacy regulations",
    badge: "Compliant",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "99.9% Uptime SLA",
    description: "Guaranteed availability with automatic failover",
    badge: "Guaranteed",
  },
  {
    icon: <Key className="w-6 h-6" />,
    title: "Zero-Knowledge Architecture",
    description: "We never have access to your unencrypted data",
    badge: "Private",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Data Centers",
    description: "Choose where your data is stored and processed",
    badge: "Flexible",
  },
];

const certifications = [
  { name: "SOC 2", logo: "🛡️" },
  { name: "ISO 27001", logo: "🔒" },
  { name: "GDPR", logo: "🇪🇺" },
  { name: "CCPA", logo: "🏛️" },
  { name: "HIPAA Ready", logo: "🏥" },
  { name: "PCI DSS", logo: "💳" },
];

export function SecurityBadges() {
  return (
    <div>
      <h3 className="text-2xl font-bold font-heading mb-8">
        Enterprise-Grade Security
      </h3>

      {/* Security Features */}
      <div className="space-y-6 mb-12">
        {securityFeatures.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-4 p-4 rounded-lg bg-background border border-surface hover:border-accent/30 transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
              {feature.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-semibold text-text">{feature.title}</h4>
                <Badge variant="secondary" className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              <p className="text-sm text-text/60">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface/50"
              >
                <span className="text-2xl">{cert.logo}</span>
                <span className="font-medium text-sm">{cert.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Penetration Tested:</span> Quarterly
              security assessments by independent third parties
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
