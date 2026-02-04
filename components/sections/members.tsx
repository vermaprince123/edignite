"use client";

import { motion } from "framer-motion";
import { Users, Mail, Linkedin, Instagram } from "lucide-react";
import { members } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function Members() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="members" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-primary">Team</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated members of Edignite who are working tirelessly to
            make a difference in children's lives through education and empowerment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Member Image */}
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 128px, 128px"
                      />
                    </div>

                    {/* Member Name */}
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {member.name}
                    </h3>

                    {/* Member Role */}
                    <p className="text-primary font-semibold mb-3 text-sm">
                      {member.role}
                    </p>

                    {/* Member Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.description}
                    </p>

                    {/* Social Links - Only show if at least one social link exists */}
                    {(member.email || member.linkedin || member.instagram) && (
                      <div className="flex items-center justify-center gap-3 mt-auto pt-4 border-t w-full">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="h-5 w-5 text-primary" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <Linkedin className="h-5 w-5 text-primary" />
                          </a>
                        )}
                        {member.instagram && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            aria-label={`${member.name}'s Instagram`}
                          >
                            <Instagram className="h-5 w-5 text-primary" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="border bg-muted/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground mb-4">
                Interested in joining our team?
              </p>
              <a
                href="/volunteer"
                className="text-primary hover:underline font-semibold text-lg"
              >
                Become a Volunteer →
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
