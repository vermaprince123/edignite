"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Impact } from "@/components/sections/impact";

export default function ImpactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Impact />
      </main>
      <Footer />
    </div>
  );
}
