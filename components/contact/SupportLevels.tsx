// components/contact/SupportLevels.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { supportLevels } from "./contact-data";

export default function SupportLevels() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-4 text-text">
            Support by Plan
          </h2>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Different levels of support to match your needs and plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportLevels.map((level, index) => (
            <Card
              key={index}
              className={`hover:shadow-xl transition-all duration-300 border-0 ${level.color} ${level.borderColor}`}
            >
              <CardHeader>
                <CardTitle className="text-center text-text">
                  {level.plan}
                </CardTitle>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand">
                    {level.responseTime}
                  </div>
                  <div className="text-sm text-text/70">response time</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-sm mb-2 text-text">
                      Channels:
                    </div>
                    <div className="space-y-1">
                      {level.channels.map((channel, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-text/70"
                        >
                          <CheckCircle className="w-3 h-3 text-brand" />
                          {channel}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-2 text-text">
                      Features:
                    </div>
                    <div className="space-y-1">
                      {level.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-text/70"
                        >
                          <CheckCircle className="w-3 h-3 text-brand" />
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
  );
}
