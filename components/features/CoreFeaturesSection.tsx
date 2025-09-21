// components/features/CoreFeaturesSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Brain,
  Sparkles,
  Search,
  FileText,
  FolderOpen,
  Users,
} from "lucide-react";
import { coreFeatures } from "./features-data";

export default function CoreFeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4 text-text">
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
              className="group hover:shadow-lg transition-all duration-300 border-0 hover:border-accent/20 bg-surface"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                  {feature.icon === "Brain" && <Brain className="w-8 h-8" />}
                  {feature.icon === "Sparkles" && (
                    <Sparkles className="w-8 h-8" />
                  )}
                  {feature.icon === "Search" && <Search className="w-8 h-8" />}
                  {feature.icon === "FileText" && (
                    <FileText className="w-8 h-8" />
                  )}
                  {feature.icon === "FolderOpen" && (
                    <FolderOpen className="w-8 h-8" />
                  )}
                  {feature.icon === "Users" && <Users className="w-8 h-8" />}
                </div>
                <CardTitle className="text-xl font-semibold text-text">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text/70 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-text/70"
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
  );
}
