"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import PublicThemeToggle from "./PublicThemeToggle";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function BodyWithTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Map theme to your custom classes
  const themeClass =
    mounted && resolvedTheme === "dark" ? "theme-modern" : "theme-classic";

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased ${themeClass}`}
    >
      {children}
      <PublicThemeToggle />
    </div>
  );
}
