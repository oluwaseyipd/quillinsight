// components/features/AdvancedCapabilitiesSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { advancedFeatures } from "./features-data";
import {
  BarChart3,
  Globe,
  Download,
  Palette,
  Lock,
  RefreshCw,
} from "lucide-react";

export default function AdvancedCapabilitiesSection() {
  return (
    <section className="py-20 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4 text-text">
            Advanced Capabilities
          </h2>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Professional-grade features for power users and teams who demand
            more from their note-taking solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedFeatures.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow bg-surface border-0"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                    {feature.icon === "BarChart3" && (
                      <BarChart3 className="w-6 h-6" />
                    )}
                    {feature.icon === "Globe" && <Globe className="w-6 h-6" />}
                    {feature.icon === "Download" && (
                      <Download className="w-6 h-6" />
                    )}
                    {feature.icon === "Palette" && (
                      <Palette className="w-6 h-6" />
                    )}
                    {feature.icon === "Lock" && <Lock className="w-6 h-6" />}
                    {feature.icon === "RefreshCw" && (
                      <RefreshCw className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-text">
                      {feature.title}
                    </h3>
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
  );
}
