"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/**
 * Floating theme toggle button for public pages.
 * - Fixed bottom-right position
 * - Circular, soft shadow, smooth hover
 * - Animated icon transition (sun ↔ moon)
 * - Fade-in on mount
 * - Accessible: aria-label="Toggle theme"
 * - High contrast in both light/dark modes
 */
export default function PublicThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure theme is resolved before rendering
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  function handleToggle() {
    // Only toggle between 'light' and 'dark' for custom theme mapping
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <AnimatePresence>
      <motion.button
        aria-label="Toggle theme"
        key={resolvedTheme}
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-surface shadow-lg border border-muted-foreground/20 w-14 h-14 flex items-center justify-center cursor-pointer transition-colors hover:bg-brand hover:text-white focus:outline-none"
        style={{
          boxShadow: "0 4px 24px rgba(107,77,230,0.10)",
        }}
      >
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: isDark ? 90 : -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: isDark ? -90 : 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon className="w-7 h-7" /> : <Sun className="w-7 h-7" />}
        </motion.span>
      </motion.button>
    </AnimatePresence>
  );
}
