"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Heart, Building2, Calendar } from "lucide-react";
import { impactStats } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * numericValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [numericValue, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const statIcons: Record<number, any> = {
  1: Users,
  2: Heart,
  3: Building2,
  4: Calendar,
};

export function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="impact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Impact</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Together, we're making a real difference in children's lives. Here's what we've achieved so far.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {impactStats.map((stat) => {
            const Icon = statIcons[stat.id] || Users;
            return (
              <motion.div key={stat.id} variants={itemVariants}>
                <Card className="border hover:border-primary/50 transition-all duration-300 hover:shadow-xl text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-3 text-primary">
                      {isInView ? <AnimatedCounter value={stat.number} /> : "0"}
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Impact Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <Card className="border bg-muted/30">
            <CardContent className="p-10 md:p-14 text-center">
              <h3 className="text-3xl font-bold mb-6">Making a Difference, One Child at a Time</h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Every number represents a life touched, a dream ignited, and a future empowered. 
                From creative arts to digital literacy, from educational support to life skills training, 
                we're building a generation of confident, skilled, and compassionate individuals. 
                Join us in this journey of transformation.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
