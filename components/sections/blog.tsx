"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, BookOpen, ArrowRight, Star } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Blog() {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.17, 0.67, 0.83, 0.67] as const,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.17, 0.67, 0.83, 0.67] as const,
      },
    },
  };

  return (
    <section 
      id="blog" 
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Floating colorful orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating educational icons */}
        {["📚", "✏️", "🎨", "🌟", "💡", "🎯"].map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-3xl md:text-4xl"
            style={{
              top: `${15 + (i % 3) * 30}%`,
              left: `${10 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30 - i * 3, 0],
              x: [0, 20 + i * 2, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Floating stars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              top: `${20 + i * 15}%`,
              left: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20 - i * 5, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Star
              className={`w-6 h-6 ${
                i % 3 === 0
                  ? "text-yellow-400/40 dark:text-yellow-500/50"
                  : i % 3 === 1
                  ? "text-blue-400/40 dark:text-blue-500/50"
                  : "text-pink-400/40 dark:text-pink-500/50"
              }`}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 text-primary text-sm font-semibold border-2 border-primary/30 backdrop-blur-sm">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ✨
              </motion.span>
              {t("blog.badge")}
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              >
                ✨
              </motion.span>
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {t("blog.title")}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("blog.subtitle")}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {blogPosts.map((post, index) => {
            const postDate = new Date(post.date);
            const formattedDate = postDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            const gradientColors = [
              "from-blue-500/10 to-cyan-500/10",
              "from-purple-500/10 to-pink-500/10",
              "from-orange-500/10 to-yellow-500/10",
            ];
            const borderColors = [
              "border-blue-300/50 hover:border-blue-500/80",
              "border-purple-300/50 hover:border-purple-500/80",
              "border-pink-300/50 hover:border-pink-500/80",
            ];
            const categoryColors = [
              "bg-blue-500/20 text-blue-700 dark:text-blue-300",
              "bg-purple-500/20 text-purple-700 dark:text-purple-300",
              "bg-pink-500/20 text-pink-700 dark:text-pink-300",
            ];

            const colorIndex = index % 3;

            return (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover="hover"
                className="h-full"
              >
                <motion.div variants={cardHoverVariants}>
                  <Card
                    className={`h-full border-2 ${borderColors[colorIndex]} transition-all duration-300 hover:shadow-2xl flex flex-col bg-gradient-to-br ${gradientColors[colorIndex]} backdrop-blur-sm relative overflow-hidden group`}
                  >
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                          >
                            <Calendar className="h-4 w-4 text-primary" />
                          </motion.div>
                          <span>{formattedDate}</span>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          <Heart className="h-5 w-5 text-red-400/60" />
                        </motion.div>
                      </div>
                      
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[colorIndex]} mb-4 backdrop-blur-sm`}
                      >
                        {post.category}
                      </span>
                      
                      <CardTitle className="text-xl md:text-2xl hover:text-primary transition-colors mb-3 group-hover:scale-105 transition-transform duration-300">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col relative z-10">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="mt-auto"
                      >
                        <Button
                          variant="ghost"
                          className="group/btn p-0 h-auto text-primary hover:text-primary font-semibold"
                          asChild
                        >
                          <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
                            {t("blog.readMore")}
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </Link>
                        </Button>
                      </motion.div>
                    </CardContent>

                    {/* Floating icon decoration */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                    >
                      <BookOpen className="h-16 w-16 text-primary" />
                    </motion.div>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all px-8 py-6 text-lg font-bold border-0"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  📖
                </motion.span>
                {t("blog.viewAll")}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
