// components/contact/OfficeLocations.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe } from "lucide-react";
import { officeLocations } from "./contact-data";

export default function OfficeLocations() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-4 text-text">
            Our Locations
          </h2>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Global presence with local expertise in major business hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {officeLocations.map((office, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 bg-surface border-0 group"
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="w-8 h-8" />
                </div>
                <CardTitle className="text-text flex items-center justify-center gap-2">
                  <span className="text-2xl">{office.flag}</span>
                  {office.city}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-text/70">{office.address}</p>
                <p className="font-medium text-text">{office.phone}</p>
                <p className="text-sm text-accent bg-accent/10 px-2 py-1 rounded inline-block">
                  {office.timezone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text/70 mb-4">
            Looking for a location near you?
          </p>
          <Button
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10"
          >
            <Globe className="w-4 h-4 mr-2" />
            Find Regional Partners
          </Button>
        </div>
      </div>
    </section>
  );
}
