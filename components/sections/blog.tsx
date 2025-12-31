"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Blog() {
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
    <section id="blog" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest <span className="text-primary">Stories</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Read inspiring stories, updates, and insights from our journey of empowering children.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => {
            const postDate = new Date(post.date);
            const formattedDate = postDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="h-full border hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-3">
                      {post.category}
                    </span>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {post.excerpt}
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
