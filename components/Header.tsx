"use client";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Header Component
const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 w-full px-6 py-6 flex items-center justify-between backdrop-blur-xl bg-background/80 border-b border-white/10"
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="relative">
          <Feather className="text-brand h-8 w-8" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        </div>
        <span className="font-heading text-2xl font-bold tracking-tight text-brand">
          QuillInsight
        </span>
      </Link>

      <nav className="hidden md:flex gap-2 items-center text-base font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-200 hover:text-accent",
              pathname === item.href
                ? "bg-accent/10 text-accent font-semibold"
                : "text-text hover:bg-accent/5",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="px-6 py-2.5 rounded-full text-text font-semibold hover:text-accent transition-colors duration-200 hidden md:inline-block"
        >
          Sign in
        </Link>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/auth/register"
            className="inline-block px-6 py-2.5 rounded-full bg-brand text-white font-semibold shadow-lg shadow-brand/25 hover:bg-brand-dark transition-all duration-200"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
