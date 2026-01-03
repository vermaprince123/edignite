"use client";

import { motion } from "framer-motion";
import { Target, Eye, Users, Calendar, GraduationCap } from "lucide-react";
import { ngoInfo } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
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
      title: "Our Mission",
      description: ngoInfo.mission,
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: ngoInfo.vision,
    },
    {
      icon: Users,
      title: "Our Values",
      description: "Compassion, Innovation, Integrity, and Empowerment guide everything we do.",
    },
    {
      icon: Calendar,
      title: "Established",
      description: `Founded in ${ngoInfo.founded}, we've been dedicated to transforming children's lives through education and holistic development.`,
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
            About <span className="text-primary">Us</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A non-profit organization dedicated to educating underprivileged children and achieving Dr. APJ Abdul Kalam's vision of an 'Educated India'.
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
              <motion.div key={value.title} variants={itemVariants}>
                <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
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
                <h3 className="text-3xl font-bold">Our Story</h3>
              </div>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p className="text-base">
                  Edignite Educational and Charitable Trust was founded in {ngoInfo.founded} with a powerful mission: <strong className="text-foreground">"Igniting Lives through Education"</strong> and achieving Dr. APJ Abdul Kalam's vision of an <strong className="text-foreground">"Educated India"</strong>. We are a non-profit trust primarily focusing on mentoring and educating underprivileged children, especially those from slum areas.
                </p>
                <p className="text-base">
                  Our work extends beyond education—we also fulfill many needs of the poor, ensuring that children have access to not just learning, but also to opportunities that help them grow, dream, and achieve. Through programs in drawing, drama, science, teaching, technical skills, and sports, we provide holistic development to students.
                </p>
                <p className="text-base">
                  We believe in the power of community. Through our innovative WhatsApp groups, we connect passionate volunteers with children who need support. Whether it's celebrating birthdays, sharing unique skills, or providing mentorship, our volunteers play a crucial role in shaping young minds.
                </p>
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary mt-8">
                  <p className="font-semibold text-foreground text-lg mb-3">
                    Walking on of of the most powerful quotes of Dr. APJ Abdul Kalam
                  </p>
                  <p className="italic text-foreground text-base leading-relaxed">
                    "{ngoInfo.kalamQuote}"
                  </p>
                </div>
                <p className="font-semibold text-foreground pt-4 text-base">
                  Together, we're contributing our part to society and building hope for others. Every child deserves quality education, and we're here to make that happen.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
