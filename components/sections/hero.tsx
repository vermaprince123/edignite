"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Users, BookOpen, Sparkles, Star, GraduationCap, Pen, Calculator, Notebook, Pencil, School, Heart, Award, Lightbulb, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ngoInfo } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20"
    >
      {/* Vibrant animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Colorful gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"
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
          className="absolute top-40 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-40 right-1/3 w-64 h-64 bg-yellow-400/30 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-56 h-56 bg-green-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating educational icons */}
        <motion.div
          className="absolute top-32 left-1/4 text-blue-400/20 dark:text-blue-500/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute top-48 right-1/4 text-purple-400/20 dark:text-purple-500/30"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <GraduationCap className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/3 text-pink-400/20 dark:text-pink-500/30"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Star className="w-14 h-14" />
        </motion.div>
        <motion.div
          className="absolute bottom-48 right-1/3 text-yellow-400/20 dark:text-yellow-500/30"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>

        {/* Playful geometric shapes */}
        <motion.div
          className="absolute top-24 right-1/2 w-24 h-24 border-4 border-blue-300/30 dark:border-blue-600/30 rounded-lg"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/2 w-16 h-16 bg-orange-300/20 dark:bg-orange-600/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-green-300/20 dark:bg-green-600/20 transform rotate-45"
          animate={{
            rotate: [45, 405],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* More floating educational icons for kids */}
        <motion.div
          className="absolute top-16 left-1/3 text-orange-400/25 dark:text-orange-500/35"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 15, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <Pencil className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute top-64 right-16 text-green-400/25 dark:text-green-500/35"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -20, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
        >
          <Notebook className="w-14 h-14" />
        </motion.div>
        <motion.div
          className="absolute bottom-64 left-16 text-cyan-400/25 dark:text-cyan-500/35"
          animate={{
            y: [0, -35, 0],
            rotate: [0, 25, -25, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <Calculator className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/5 text-red-400/25 dark:text-red-500/35"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -15, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9,
          }}
        >
          <School className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/5 text-yellow-400/25 dark:text-yellow-500/35"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 20, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <Lightbulb className="w-14 h-14" />
        </motion.div>
        <motion.div
          className="absolute top-2/3 right-1/3 text-pink-400/25 dark:text-pink-500/35"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -25, 25, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          <Award className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 right-1/4 text-purple-400/25 dark:text-purple-500/35"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 18, -18, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8,
          }}
        >
          <Heart className="w-10 h-10" />
        </motion.div>

        {/* Floating letters and numbers for kids */}
        <motion.div
          className="absolute top-40 left-1/5 text-4xl md:text-5xl font-bold text-blue-400/30 dark:text-blue-500/40"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          A
        </motion.div>
        <motion.div
          className="absolute top-56 right-1/3 text-4xl md:text-5xl font-bold text-purple-400/30 dark:text-purple-500/40"
          animate={{
            y: [0, 35, 0],
            rotate: [0, -360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.1,
          }}
        >
          B
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/3 text-4xl md:text-5xl font-bold text-pink-400/30 dark:text-pink-500/40"
          animate={{
            y: [0, -28, 0],
            rotate: [0, 360],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          C
        </motion.div>
        <motion.div
          className="absolute bottom-56 right-1/5 text-4xl md:text-5xl font-bold text-orange-400/30 dark:text-orange-500/40"
          animate={{
            y: [0, 32, 0],
            rotate: [0, -360],
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.3,
          }}
        >
          1
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/6 text-4xl md:text-5xl font-bold text-green-400/30 dark:text-green-500/40"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360],
            scale: [1, 1.22, 1],
          }}
          transition={{
            duration: 9.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          2
        </motion.div>
        <motion.div
          className="absolute top-2/3 right-1/6 text-4xl md:text-5xl font-bold text-yellow-400/30 dark:text-yellow-500/40"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.6,
          }}
        >
          3
        </motion.div>

        {/* Colorful floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + (i % 3) * 30}%`,
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
                i % 4 === 0
                  ? "text-yellow-400/40 dark:text-yellow-500/50"
                  : i % 4 === 1
                  ? "text-blue-400/40 dark:text-blue-500/50"
                  : i % 4 === 2
                  ? "text-pink-400/40 dark:text-pink-500/50"
                  : "text-purple-400/40 dark:text-purple-500/50"
              }`}
            />
          </motion.div>
        ))}

        {/* Floating sparkles/confetti effect */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              top: `${5 + i * 8}%`,
              left: `${5 + (i % 4) * 25}%`,
            }}
            animate={{
              y: [0, -30 - i * 3, 0],
              x: [0, 10 + i * 2, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <Sparkles
              className={`w-4 h-4 ${
                i % 5 === 0
                  ? "text-cyan-400/30 dark:text-cyan-500/40"
                  : i % 5 === 1
                  ? "text-rose-400/30 dark:text-rose-500/40"
                  : i % 5 === 2
                  ? "text-emerald-400/30 dark:text-emerald-500/40"
                  : i % 5 === 3
                  ? "text-amber-400/30 dark:text-amber-500/40"
                  : "text-indigo-400/30 dark:text-indigo-500/40"
              }`}
            />
          </motion.div>
        ))}

        {/* Animated colorful circles (like bubbles) */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              top: `${20 + i * 15}%`,
              left: `${15 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -40 - i * 5, 0],
              x: [0, 15 + i * 2, 0],
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <div
              className={`w-full h-full rounded-full ${
                i % 6 === 0
                  ? "bg-blue-400/20 dark:bg-blue-500/30"
                  : i % 6 === 1
                  ? "bg-purple-400/20 dark:bg-purple-500/30"
                  : i % 6 === 2
                  ? "bg-pink-400/20 dark:bg-pink-500/30"
                  : i % 6 === 3
                  ? "bg-yellow-400/20 dark:bg-yellow-500/30"
                  : i % 6 === 4
                  ? "bg-green-400/20 dark:bg-green-500/30"
                  : "bg-orange-400/20 dark:bg-orange-500/30"
              }`}
            />
          </motion.div>
        ))}

        {/* Playful emoji characters floating around */}
        {["🎓", "📚", "✏️", "🎨", "🌟", "💡", "🎯", "🌈"].map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-3xl md:text-4xl"
            style={{
              top: `${10 + (i % 4) * 25}%`,
              left: `${8 + (i % 3) * 30}%`,
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

        {/* Bouncing colorful shapes (like toys) */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`toy-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${15 + (i % 3) * 10}px`,
              height: `${15 + (i % 3) * 10}px`,
              top: `${5 + (i % 5) * 20}%`,
              left: `${10 + (i % 4) * 25}%`,
            }}
            animate={{
              y: [0, -50 - i * 4, 0],
              x: [0, 25 + i * 3, 0],
              rotate: [0, 360],
              scale: [0.8, 1.4, 0.8],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          >
            <div
              className={`w-full h-full rounded-full ${
                i % 5 === 0
                  ? "bg-red-400/30 dark:bg-red-500/40"
                  : i % 5 === 1
                  ? "bg-blue-400/30 dark:bg-blue-500/40"
                  : i % 5 === 2
                  ? "bg-yellow-400/30 dark:bg-yellow-500/40"
                  : i % 5 === 3
                  ? "bg-green-400/30 dark:bg-green-500/40"
                  : "bg-purple-400/30 dark:bg-purple-500/40"
              }`}
            />
          </motion.div>
        ))}

        {/* Playful smiley faces */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`smiley-${i}`}
            className="absolute"
            style={{
              top: `${15 + (i % 3) * 30}%`,
              left: `${12 + (i % 2) * 45}%`,
            }}
            animate={{
              y: [0, -25 - i * 2, 0],
              x: [0, 15 + i * 2, 0],
              rotate: [0, 20, -20, 0],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <Smile
              className={`w-8 h-8 ${
                i % 3 === 0
                  ? "text-yellow-400/40 dark:text-yellow-500/50"
                  : i % 3 === 1
                  ? "text-orange-400/40 dark:text-orange-500/50"
                  : "text-pink-400/40 dark:text-pink-500/50"
              }`}
            />
          </motion.div>
        ))}

        {/* Playful wiggling lines (like crayon strokes) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute"
            style={{
              top: `${8 + (i % 4) * 25}%`,
              left: `${5 + (i % 3) * 35}%`,
              width: `${40 + i * 5}px`,
              height: "3px",
            }}
            animate={{
              x: [0, 30 + i * 3, 0],
              y: [0, -20 - i * 2, 0],
              rotate: [0, 45, -45, 0],
              scaleX: [1, 1.5, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <div
              className={`h-full rounded-full ${
                i % 4 === 0
                  ? "bg-blue-400/25 dark:bg-blue-500/35"
                  : i % 4 === 1
                  ? "bg-pink-400/25 dark:bg-pink-500/35"
                  : i % 4 === 2
                  ? "bg-yellow-400/25 dark:bg-yellow-500/35"
                  : "bg-green-400/25 dark:bg-green-500/35"
              }`}
            />
          </motion.div>
        ))}

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,rgba(147,197,253,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.05)_1px,transparent_1px)]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-5xl mx-auto"
        >
          {/* Badge with playful bounce */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -5, 0],
            }}
            transition={{ 
              delay: 0.2, 
              duration: 0.5,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }
            }}
            className="inline-block max-w-[90%] sm:max-w-none"
          >
            <span className="inline-block px-3 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 text-primary text-xs sm:text-sm font-semibold border-2 border-primary/30 backdrop-blur-sm shadow-lg text-center">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="inline-block"
              >
                ✨
              </motion.span>
              <span className="hidden sm:inline"> {t("hero.badge")} </span>
              <span className="inline sm:hidden"> {t("hero.badgeShort")} </span>
              <motion.span
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                className="inline-block"
              >
                ✨
              </motion.span>
            </span>
          </motion.div>

          {/* Main Heading with playful bounce */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent inline-block"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              {t("hero.title1")}
            </motion.span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 dark:from-orange-400 dark:via-yellow-400 dark:to-green-400 bg-clip-text text-transparent inline-block"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.3,
              }}
            >
              {t("hero.title2")}
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto"
          >
            {t("hero.tagline")}
          </motion.p>

          {/* Mission Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          {/* Key Points with playful animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
              whileHover={{ scale: 1.15, y: -8, rotate: [0, -5, 5, 0] }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-300/50 dark:border-blue-700/50 shadow-md"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{t("hero.educationMentorship")}</span>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
              whileHover={{ scale: 1.15, y: -8, rotate: [0, 5, -5, 0] }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm border border-purple-300/50 dark:border-purple-700/50 shadow-md"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              >
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">{t("hero.childrenCount")}</span>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.6,
              }}
              whileHover={{ scale: 1.15, y: -8, rotate: [0, -5, 5, 0] }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/80 dark:bg-pink-900/30 backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 shadow-md"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </motion.div>
              <span className="text-sm font-semibold text-pink-700 dark:text-pink-300">{t("hero.since")}</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons with playful bounce */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              whileHover={{ scale: 1.1, y: -5, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all px-8 py-6 text-lg font-bold border-0 relative overflow-hidden"
              >
                <Link href="/volunteer">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="inline-block mr-2"
                  >
                    🎓
                  </motion.span>
                  {t("hero.becomeVolunteer")}
                </Link>
              </Button>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.7,
              }}
              whileHover={{ scale: 1.1, y: -5, rotate: [0, 5, -5, 0] }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-purple-400 dark:border-purple-500 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white hover:border-transparent px-8 py-6 text-lg font-bold shadow-lg relative overflow-hidden"
              >
                <Link href="/contact">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="inline-block mr-2"
                  >
                    💬
                  </motion.span>
                  {t("hero.getInTouch")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="pt-16"
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {/* <Link href="/about" className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowDown className="h-5 w-5" />
              </Link> */}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
