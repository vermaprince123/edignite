"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { galleryImages, galleryCategories } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Gallery() {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Get unique categories for preview
  const previewImages = galleryImages.slice(0, 6);
  const categoryCounts = galleryCategories.reduce((acc, cat) => {
    if (cat.id !== "all") {
      acc[cat.id] = galleryImages.filter((img) => img.category === cat.id).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      education: "from-blue-500/20 to-cyan-500/20",
      arts: "from-purple-500/20 to-pink-500/20",
      events: "from-orange-500/20 to-yellow-500/20",
      sports: "from-green-500/20 to-emerald-500/20",
      community: "from-indigo-500/20 to-blue-500/20",
    };
    return gradients[category] || "from-gray-500/20 to-gray-600/20";
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Capturing moments of joy, learning, and creativity from our programs and events.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {previewImages.map((image) => {
            const gradient = getCategoryGradient(image.category);
            
            return (
              <motion.div key={image.id} variants={itemVariants}>
                <Link href="/gallery">
                  <Card className="group h-64 border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer relative">
                    <div className={`h-full bg-gradient-to-br ${gradient} border border-border relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-muted/50 group-hover:bg-muted/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Images className="h-16 w-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/95 to-transparent">
                        <h3 className="text-foreground font-semibold text-lg mb-1">{image.title}</h3>
                        <p className="text-muted-foreground text-sm">{image.description}</p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-primary/90 backdrop-blur-sm rounded-full p-2">
                          <Images className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10"
        >
          {galleryCategories.filter(cat => cat.id !== "all").map((category) => (
            <Card key={category.id} className="border text-center p-4 hover:border-primary/50 transition-colors">
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">
                {categoryCounts[category.id] || 0}
              </div>
              <div className="text-xs text-muted-foreground font-medium">{category.name}</div>
            </Card>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            asChild
          >
            <Link href="/gallery" className="group">
              View All Photos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
