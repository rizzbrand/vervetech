"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/dashboard/context/ThemeContext";
import { cn } from "@/dashboard/lib/cn";

export function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-surface text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
