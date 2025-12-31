"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, MessageSquare, Send, Users, Lightbulb, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

export function Volunteer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: VolunteerFormData) => {
    console.log("Volunteer form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    alert("Thank you for your interest! We'll contact you soon.");
  };

  const benefits = [
    {
      icon: Heart,
      title: "Make a Real Impact",
      description: "Directly contribute to children's growth and development",
    },
    {
      icon: Lightbulb,
      title: "Learn & Grow",
      description: "Gain valuable experience and develop new skills",
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect with like-minded individuals and build lasting friendships",
    },
    {
      icon: Calendar,
      title: "Flexible Commitment",
      description: "Choose how and when you want to contribute",
    },
  ];

  return (
    <section id="volunteer" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Become a <span className="text-primary">Volunteer</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our team of passionate volunteers and make a meaningful difference in children's lives.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="border h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Why Volunteer?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border">
              <CardHeader>
                <CardTitle>Join Us Today</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      placeholder="+91-XXXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Why do you want to volunteer?
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-all"
                      placeholder="Tell us about yourself and your interests..."
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Or join our WhatsApp group:{" "}
                    <a
                      href="https://bit.ly/Edignite_Joining_Form"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Click here to join
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
