"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogPosts } from "@/lib/data";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Heart, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function BlogPostPage() {
  const params = useParams();
  const { t } = useLanguage();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 pb-16 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Button asChild>
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                {t("blog.backToBlog") || "Back to Blog"}
              </Link>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 via-purple-50 via-pink-50 to-orange-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 rounded-2xl p-8 md:p-12 mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>

            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-primary/20 text-primary mb-6">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <Heart className="h-5 w-5 text-red-400" />
                <span className="text-sm">Inspiring Story</span>
              </motion.div>
            </div>
          </motion.article>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 dark:border-gray-800">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              {/* Placeholder for full content - you can expand this later */}
              <div className="space-y-6 text-muted-foreground">
                <p>
                  This is a beautiful story that touches hearts and inspires change. 
                  Every word here represents a moment of transformation, a spark of hope, 
                  and a journey towards empowerment.
                </p>
                <p>
                  We believe in the power of storytelling to connect, inspire, and create 
                  lasting impact. This story is just one of many that showcase the incredible 
                  journeys of the children we serve.
                </p>
                <p>
                  Stay tuned for more inspiring stories, heartfelt moments, and emotional 
                  journeys from our mission of empowering children through education.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts or CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {t("blog.viewAll")}
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
