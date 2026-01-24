"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Globe, Linkedin } from "lucide-react";
import { ngoInfo } from "@/lib/data";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: ngoInfo.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: ngoInfo.instagram, label: "Instagram" },
    { icon: Facebook, href: ngoInfo.facebook, label: "Facebook" },
    { icon: Mail, href: `mailto:${ngoInfo.email}`, label: "Email" },
  ];

  if (ngoInfo.website) {
    socialLinks.push({ icon: Globe, href: ngoInfo.website, label: "Website" });
  }

  const footerLinks = {
    "Quick Links": [
      { name: "About Us", href: "/about" },
      { name: "Our Programs", href: "/programs" },
      { name: "Get Involved", href: "/volunteer" },
      { name: "Contact Us", href: "/contact" },
    ],
    "Resources": [
      { name: "Blog", href: "/blog" },
      { name: "Events", href: "/events" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {ngoInfo.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ngoInfo.mission}
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks["Quick Links"].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks["Resources"].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <a href={`mailto:${ngoInfo.email}`} className="hover:text-primary transition-colors">
                  {ngoInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <a href={`tel:${ngoInfo.phone}`} className="hover:text-primary transition-colors">
                  {ngoInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>{ngoInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} {ngoInfo.name} - Educational and Charitable Trust. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Registered NGO | Surat, Gujarat | Founded {ngoInfo.founded}
          </p>
        </div>
      </div>
    </footer>
  );
}

