"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Globe, Linkedin } from "lucide-react";
import { ngoInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();
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
    quickLinks: [
      { nameKey: "about", href: "/about" },
      { nameKey: "programs", href: "/programs" },
      { nameKey: "getInvolved", href: "/volunteer" },
      { nameKey: "contact", href: "/contact" },
    ],
    resources: [
      // { nameKey: "blog", href: "/blog" },
      // { nameKey: "events", href: "/events" },
      { nameKey: "gallery", href: "/gallery" },
      { nameKey: "contact", href: "/contact" },
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
              {t("footer.description")}
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
            <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.nameKey === "getInvolved" ? t(`${link.nameKey}`) : t(`nav.${link.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.nameKey}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.nameKey === "contact" ? t(`${link.nameKey}`) : t(`nav.${link.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.contactUs")}</h3>
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
            {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.registered")}
          </p>
        </div>
      </div>
    </footer>
  );
}

