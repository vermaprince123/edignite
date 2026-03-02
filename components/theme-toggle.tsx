"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themes = [
  { label: "White", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by only showing active state after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, don't show active state to avoid hydration mismatch
  const getIsActive = (themeOptionValue: string) => {
    if (!mounted) return false;
    return theme === themeOptionValue;
  };

  return (
    <div
      className="flex items-center rounded-lg border border-border bg-background/80 p-1"
      role="group"
      aria-label="Theme switcher"
    >
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = getIsActive(themeOption.value);

        return (
          <Button
            key={themeOption.value}
            variant="ghost"
            size="sm"
            onClick={() => setTheme(themeOption.value)}
            className={cn(
              "h-8 gap-1.5 px-2 sm:px-2.5",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                : "text-foreground/70 hover:text-foreground"
            )}
            aria-pressed={isActive}
            aria-label={`Switch to ${themeOption.label} mode`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{themeOption.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
