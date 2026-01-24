"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Volunteer } from "@/components/sections/volunteer";

export default function VolunteerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Volunteer />
      </main>
      <Footer />
    </div>
  );
}
