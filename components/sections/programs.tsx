"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Palette,
  PartyPopper,
  Backpack,
  Laptop,
  HeartHandshake,
  Brain,
  X,
  Download,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { programs } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

const programIcons: Record<string, any> = {
  mentorship: BookOpen,
  creativeArts: Palette,
  onlineMentorship: Laptop,
  events: PartyPopper,
  admissions: Backpack,
  distribution: HeartHandshake,
  aiSession: Brain,
};

export function Programs() {
  const { t } = useLanguage();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
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
              const key = (program as any).programKey as string;
              const Icon = programIcons[key] || BookOpen;
              const image = (program as any).image as string | undefined;
              const pdf = (program as any).pdf as string | undefined;
              const sponsor = (program as any).sponsor as { name: string; logo: string } | undefined;

              return (
                <motion.div key={program.id} variants={itemVariants}>
                  <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group overflow-hidden flex flex-col">
                    {image ? (
                      <div
                        className="relative w-full h-52 overflow-hidden cursor-zoom-in"
                        onClick={() => setLightboxSrc(image)}
                      >
                        <Image
                          src={image}
                          alt={t(`programs.${key}.title`)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-black/80 rounded-full p-2 shadow-lg">
                            <ZoomIn className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <CardHeader className="pb-4">
                      {!image && (
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      )}
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {t(`programs.${key}.title`)}
                      </CardTitle>
                      <p className="text-sm font-semibold text-primary">
                        {t(`programs.${key}.stats`)}
                      </p>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4 flex-1">
                      <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                        {t(`programs.${key}.description`)}
                      </p>

                      {sponsor && (
                        <div className="flex items-center gap-3 border border-border rounded-lg px-3 py-2 bg-muted/40">
                          <div className="relative h-9 w-9 shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={sponsor.logo}
                              alt={sponsor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="leading-tight">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                              Webinar Sponsor
                            </p>
                            <p className="text-sm font-semibold">{sponsor.name}</p>
                          </div>
                        </div>
                      )}

                      {pdf && (
                        <a
                          href={pdf}
                          download
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-primary/40 rounded-lg px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 w-fit"
                        >
                          <Download className="h-4 w-4" />
                          Prize Details &amp; Rules
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-3xl w-full rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt="Program preview"
                width={1080}
                height={1080}
                className="w-full h-auto object-contain"
              />
              <button
                onClick={() => setLightboxSrc(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
