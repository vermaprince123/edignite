"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "gu" : "en");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors",
          "hover:text-primary"
        )}
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">
          {language === "en" ? "English" : "ગુજરાતી"}
        </span>
        <span className="sm:hidden">
          {language === "en" ? "EN" : "GU"}
        </span>
      </Button>
    </motion.div>
  );
}
