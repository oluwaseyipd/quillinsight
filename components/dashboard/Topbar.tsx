"use client";
import { Bell, User, Sun, Moon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export default function Topbar() {
  const supabase = createClient();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // Extract name from email or use full email if no display name
        const displayName =
          user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
        setUserName(displayName);
      }
    };
    fetchUser();
  }, []);
  return (
    <header
      className="flex items-center justify-between p-4 border-b backdrop-blur-sm"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "rgba(var(--color-text-rgb, 31, 41, 55), 0.1)",
        color: "var(--color-text)",
      }}
    >
      {/* Welcome message */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Welcome Back, {userName || "User"}
        </h1>
      </motion.div>

      {/* Right side controls */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Theme selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                color: "var(--color-text)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(var(--color-accent-rgb, 107, 77, 230), 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Palette className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-0 shadow-xl backdrop-blur-xl"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          >
            <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Classic Light</DropdownMenuItem>
            <DropdownMenuItem>Modern Dark</DropdownMenuItem>
            <DropdownMenuItem>Minimal Gray</DropdownMenuItem>
            <DropdownMenuItem>Elegant Purple</DropdownMenuItem>
            <DropdownMenuItem>Vibrant Pink</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              color: "var(--color-text)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(var(--color-accent-rgb, 107, 77, 230), 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Bell className="h-5 w-5" />
            {/* Notification dot */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
            </motion.div>
          </Button>
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(var(--color-accent-rgb, 107, 77, 230), 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Avatar
                className="h-10 w-10 border-2 transition-all duration-200"
                style={{ borderColor: "var(--color-accent)" }}
              >
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback
                  className="text-white font-semibold"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>

              {/* Online indicator */}
              <motion.div
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: "#10B981",
                  borderColor: "var(--color-surface)",
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border-0 shadow-xl backdrop-blur-xl"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          >
            <DropdownMenuLabel className="font-semibold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator
              style={{
                backgroundColor: "rgba(var(--color-text-rgb, 31, 41, 55), 0.1)",
              }}
            />
            <DropdownMenuItem className="rounded-lg transition-colors duration-200 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg transition-colors duration-200 cursor-pointer">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg transition-colors duration-200 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator
              style={{
                backgroundColor: "rgba(var(--color-text-rgb, 31, 41, 55), 0.1)",
              }}
            />
            <DropdownMenuItem className="rounded-lg transition-colors duration-200 cursor-pointer text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </header>
  );
}
