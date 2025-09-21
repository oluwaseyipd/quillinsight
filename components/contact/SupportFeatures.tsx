// components/contact/SupportFeatures.tsx
import { supportFeatures } from "./contact-data";
import { Zap, Shield, Heart } from "lucide-react";

export default function SupportFeatures() {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {supportFeatures.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-accent flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {feature.icon === "Zap" && <Zap className="w-5 h-5" />}
                {feature.icon === "Shield" && <Shield className="w-5 h-5" />}
                {feature.icon === "Heart" && <Heart className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                {feature.title}
              </h3>
              <p className="text-text/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
