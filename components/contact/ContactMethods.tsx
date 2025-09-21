// components/contact/ContactMethods.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contactMethods } from "./contact-data";
import { Mail, Phone, MessageSquare, Calendar } from "lucide-react";

export default function ContactMethods() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-4 text-text">
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
              className={`group hover:shadow-xl transition-all duration-300 border-0 ${
                method.primary
                  ? "ring-2 ring-brand/20 shadow-lg bg-gradient-to-br from-brand/5 to-accent/5"
                  : "bg-surface hover:shadow-lg"
              }`}
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    method.primary
                      ? "bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {method.icon === "MessageSquare" && (
                    <MessageSquare className="w-6 h-6" />
                  )}
                  {method.icon === "Mail" && <Mail className="w-6 h-6" />}
                  {method.icon === "Phone" && <Phone className="w-6 h-6" />}
                  {method.icon === "Calendar" && (
                    <Calendar className="w-6 h-6" />
                  )}
                </div>
                <CardTitle className="text-lg text-text">
                  {method.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text/70 mb-2">{method.description}</p>
                <p className="text-sm text-text/70 mb-6">{method.details}</p>
                <Button
                  variant={method.primary ? "default" : "outline"}
                  size="sm"
                  className={`w-full ${
                    method.primary
                      ? "bg-brand hover:bg-brand-dark text-white"
                      : "border-accent text-accent hover:bg-accent/10"
                  }`}
                >
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
