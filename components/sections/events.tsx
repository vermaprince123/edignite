"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { events } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Events() {
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

  return (
    <section id="events" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join us for exciting events, workshops, and celebrations that bring our community together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {events.map((event) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <motion.div key={event.id} variants={itemVariants}>
                <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-3">{event.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{formattedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-center min-w-[70px]">
                        <div className="text-xs font-medium">DAY</div>
                        <div className="text-2xl">{eventDate.getDate()}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {event.description}
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
