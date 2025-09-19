"use client";
import { useTheme } from "next-themes";
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

  // Map theme to your custom classes
  const themeClass =
    resolvedTheme === "dark" ? "theme-modern" : "theme-classic";

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased ${themeClass}`}
    >
      {children}
      <PublicThemeToggle />
    </div>
  );
}
