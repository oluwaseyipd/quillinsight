// components/pricing/SocialProof.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, FileText } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "/avatars/sarah.jpg",
    content:
      "QuillInsight has revolutionized how I organize my thoughts. The AI summaries save me hours every week.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Research Scientist",
    company: "BioLabs",
    avatar: "/avatars/marcus.jpg",
    content:
      "The auto-tagging feature is incredible. It finds connections in my research notes that I would have missed.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Consultant",
    company: "Strategy Plus",
    avatar: "/avatars/emily.jpg",
    content:
      "Client meetings are so much more productive now that I can extract key insights instantly.",
    rating: 5,
  },
];

const stats = [
  {
    icon: <Users className="w-6 h-6" />,
    value: "10,000+",
    label: "Active Users",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    value: "500K+",
    label: "Notes Processed Daily",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "95%",
    label: "Customer Retention",
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: "4.9/5",
    label: "Average Rating",
  },
];

const logos = [
  { name: "TechCrunch", logo: "/logos/techcrunch.svg" },
  { name: "Product Hunt", logo: "/logos/producthunt.svg" },
  { name: "Y Combinator", logo: "/logos/yc.svg" },
  { name: "Forbes", logo: "/logos/forbes.svg" },
];

export function SocialProof() {
  return (
    <section className="py-16 bg-surface/50">
      <div className="container mx-auto px-4">
        {/* Featured In */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-text/60 mb-6">FEATURED IN</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {logos.map((logo) => (
              <div key={logo.name} className="text-text/40 font-semibold">
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full text-accent mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center font-heading mb-2">
            Loved by professionals worldwide
          </h3>
          <p className="text-text/60 text-center mb-12">
            See what our users are saying about QuillInsight
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="bg-background hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-text/80 mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-text">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-text/60">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge
            variant="outline"
            className="bg-green-50 border-green-200 text-green-700"
          >
            ⭐ 4.9/5 on G2
          </Badge>
          <Badge
            variant="outline"
            className="bg-blue-50 border-blue-200 text-blue-700"
          >
            🏆 #1 Product of the Day
          </Badge>
          <Badge
            variant="outline"
            className="bg-purple-50 border-purple-200 text-purple-700"
          >
            🚀 YC S23 Batch
          </Badge>
          <Badge
            variant="outline"
            className="bg-orange-50 border-orange-200 text-orange-700"
          >
            📰 Featured in TechCrunch
          </Badge>
        </div>
      </div>
    </section>
  );
}
