"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTheme } from "next-themes";

type CustomTheme = "classic" | "modern" | "minimal" | "elegant" | "vibrant";

interface ThemeContextType {
  activeTheme: CustomTheme;
  setCustomTheme: (theme: CustomTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<CustomTheme>("classic"); // Default to classic
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from local storage or set default
    const storedTheme = localStorage.getItem("customTheme") as CustomTheme;
    if (storedTheme) {
      setActiveTheme(storedTheme);
      // Also update next-themes if it's a light/dark theme
      if (storedTheme === "classic") setTheme("light");
      if (storedTheme === "modern") setTheme("dark");
    } else if (resolvedTheme) {
      // If no custom theme, use next-themes resolved theme
      setActiveTheme(resolvedTheme === "dark" ? "modern" : "classic");
    }
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("customTheme", activeTheme);
    }
  }, [activeTheme, mounted]);

  const setCustomTheme = (theme: CustomTheme) => {
    setActiveTheme(theme);
    // Sync with next-themes for light/dark modes
    if (theme === "classic") setTheme("light");
    else if (theme === "modern") setTheme("dark");
    else setTheme("light"); // For other custom themes, default to light mode in next-themes if it doesn't have a direct mapping
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProviderWrapper");
  }
  return context;
};
