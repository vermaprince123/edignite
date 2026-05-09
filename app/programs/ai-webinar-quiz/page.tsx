import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WebinarQuiz } from "@/components/quiz/webinar-quiz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI, Climate & Future Skills Quiz — Edignite",
  description: "Webinar Pre-Assessment Quiz — 10 Questions · 20 Marks",
};

export default function WebinarQuizPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <WebinarQuiz />
        </div>
      </main>
      <Footer />
    </div>
  );
}
