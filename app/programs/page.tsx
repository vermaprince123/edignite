"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Programs } from "@/components/sections/programs";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Programs />
      </main>
      <Footer />
    </div>
  );
}
