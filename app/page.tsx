"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { HeroBanner } from "@/components/sections/hero-banner";
import { About } from "@/components/sections/about";
import { Programs } from "@/components/sections/programs";
import { Impact } from "@/components/sections/impact";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { Events } from "@/components/sections/events";
import { Blog } from "@/components/sections/blog";
import { Volunteer } from "@/components/sections/volunteer";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* <HeroBanner /> */}
        <About />
        <Programs />
        <Impact />
        <Testimonials />
        <Gallery />
        {/* <Events />  */} {/* TODO: Uncomment after dynamic implementation of events section */}
        <Blog />
        <Volunteer />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

