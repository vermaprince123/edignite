"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Blog } from "@/components/sections/blog";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
