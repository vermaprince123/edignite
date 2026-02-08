"use client";

import { motion } from "framer-motion";
import { BookOpen, Palette, PartyPopper, Backpack, Laptop, HeartHandshake } from "lucide-react";
import { programs } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

const programIcons: Record<number, any> = {
  1: BookOpen,
  2: Palette,
  3: Laptop,
  4: PartyPopper,
  5: Backpack,
  6: HeartHandshake,
};

export function Programs() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="programs" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("programs.title")}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("programs.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program) => {
            const Icon = programIcons[program.id] || BookOpen;
            const programKey = program.id === 1 ? "mentorship" : 
                              program.id === 2 ? "creativeArts" :
                              program.id === 3 ? "onlineMentorship" :
                              program.id === 4 ? "events" :
                              program.id === 5 ? "admissions" : "distribution";
            return (
              <motion.div key={program.id} variants={itemVariants}>
                <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {t(`programs.${programKey}.title`)}
                    </CardTitle>
                    <p className="text-sm font-semibold text-primary">
                      {t(`programs.${programKey}.stats`)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {t(`programs.${programKey}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
