"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";

const EVENT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdHciIRM2C39n3DJ094tnKidSl29cnDIhqyNeH2soGZH50qOw/viewform";

export function EventBanner() {
  return (
    <section className="py-12 bg-primary/5 border-y border-primary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Upcoming Event
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-1">
                Register AI Transition in Industry and Career Opportunities webinar — Limited Seats Available!
              </h3>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Join us for our upcoming webinar
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => window.open(EVENT_FORM_URL, "_blank", "noopener,noreferrer")}
          >
            Register Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
