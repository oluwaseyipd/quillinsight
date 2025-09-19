"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  StickyNote,
  Tags,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: StickyNote, label: "Notes", href: "/dashboard/notes" },
  { icon: Tags, label: "Tags", href: "/dashboard/tags" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      initial={{ width: isCollapsed ? "4rem" : "16rem" }}
      animate={{ width: isCollapsed ? "4rem" : "16rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen bg-surface border-r border-opacity-20 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-text)",
        color: "var(--color-text)",
      }}
    >
      {/* Header with brand */}
      <div
        className="flex items-center justify-between p-6 border-b border-opacity-10"
        style={{ borderColor: "var(--color-text)" }}
      >
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center space-x-2"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-current via-current to-current bg-clip-text">
                QuillInsight
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={item.href}
                onClick={() => setActiveItem(item.href)}
                className={`
                  group flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden
                  ${
                    activeItem === item.href
                      ? "text-white shadow-lg transform scale-[1.02]"
                      : "hover:bg-opacity-80 hover:transform hover:scale-[1.01]"
                  }
                `}
                style={{
                  backgroundColor:
                    activeItem === item.href
                      ? "var(--color-accent)"
                      : "transparent",
                  color:
                    activeItem === item.href ? "white" : "var(--color-text)",
                }}
                onMouseEnter={(e) => {
                  if (activeItem !== item.href) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(var(--color-accent-rgb, 107, 77, 230), 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeItem !== item.href) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {/* Active item background animation */}
                {activeItem === item.href && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: "var(--color-accent)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon with animation */}
                <div className="relative z-10 flex items-center justify-center">
                  <item.icon
                    className={`h-5 w-5 transition-transform duration-200 ${
                      activeItem === item.href
                        ? "scale-110"
                        : "group-hover:scale-105"
                    }`}
                  />
                </div>

                {/* Label with animation */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="relative z-10 font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, transparent, rgba(var(--color-accent-rgb, 107, 77, 230), 0.05))`,
                    }}
                  />
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Collapse toggle button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: "var(--color-bg)",
            borderColor: "var(--color-accent)",
            color: "var(--color-accent)",
          }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </motion.div>
        </Button>
      </div>

      {/* Gradient overlay for visual depth */}
      <div
        className="absolute inset-y-0 right-0 w-px opacity-30"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-accent), transparent)`,
        }}
      />
    </motion.div>
  );
}
