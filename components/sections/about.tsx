"use client";

import { motion } from "framer-motion";
import { Target, Eye, Users, Calendar, GraduationCap } from "lucide-react";
import { ngoInfo } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

export function About() {
  const { t } = useLanguage();
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const values = [
    {
      icon: Target,
      titleKey: "mission",
      descriptionKey: "missionText",
    },
    {
      icon: Eye,
      titleKey: "vision",
      descriptionKey: "visionText",
    },
    {
      icon: Users,
      titleKey: "values",
      descriptionKey: "valuesText",
    },
    {
      icon: Calendar,
      titleKey: "established",
      descriptionKey: "establishedText",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("about.description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.titleKey} variants={itemVariants}>
                <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t(`about.${value.titleKey}`)}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`about.${value.descriptionKey}`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border bg-muted/30">
            <CardContent className="p-10 md:p-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{t("about.story")}</h3>
              </div>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p className="text-base">
                  {t("about.storyText")}
                </p>
                <p className="text-base">
                  {t("about.storyText2")}
                </p>
                <p className="text-base">
                  {t("about.storyText3")}
                </p>
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary mt-8">
                  <p className="font-semibold text-foreground text-lg mb-3">
                    {t("about.kalamQuoteLabel")}
                  </p>
                  <p className="italic text-foreground text-base leading-relaxed">
                    &quot;{t("about.kalamQuote")}&quot;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
