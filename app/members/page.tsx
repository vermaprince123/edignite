"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Members } from "@/components/sections/members";

export default function MembersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Members />
      </main>
      <Footer />
    </div>
  );
}
