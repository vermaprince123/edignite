"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Events } from "@/components/sections/events";

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Events />
      </main>
      <Footer />
    </div>
  );
}
