"use client";

import { motion } from "framer-motion";
import { Heart, CreditCard, Banknote, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Donate() {
  const donationMethods = [
    {
      icon: CreditCard,
      title: "Online Donation",
      description: "Quick and secure online payment",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "UPI Payment",
      description: "Scan QR code or use UPI ID",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Banknote,
      title: "Bank Transfer",
      description: "Direct bank transfer details",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section id="donate" className="py-20 md:py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <Heart className="h-16 w-16 text-pink-500 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Make a <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Difference</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 text-lg max-w-3xl mx-auto">
            Your contribution helps us empower more children and create lasting impact in their lives.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {donationMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle>{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                      Donate Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-2 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Every Contribution Matters</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your donation directly supports our programs, helping us reach more children, 
                provide better resources, and create lasting positive change. 
                Together, we can ignite more dreams and empower more futures.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                  💰 100% Transparent
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                  📋 Tax Deductible
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                  🔒 Secure Payment
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

