"use client";
import { Bell, Search, User, Sun, Moon, Palette } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
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

export default function Topbar() {
  return (
    <header
      className="flex items-center justify-between p-4 border-b backdrop-blur-sm"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "rgba(var(--color-text-rgb, 31, 41, 55), 0.1)",
        color: "var(--color-text)",
      }}
    >
      {/* Enhanced search bar */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200"
          style={{ color: "var(--color-text)" }}
        />
        <Input
          type="search"
          placeholder="Search notes, tags, or content..."
          className="pl-10 pr-4 py-2 w-full rounded-xl border-0 transition-all duration-200 focus:ring-2 focus:scale-[1.02] placeholder:text-opacity-60"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            boxShadow: `0 2px 8px rgba(var(--color-accent-rgb, 107, 77, 230), 0.1)`,
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = `0 4px 20px rgba(var(--color-accent-rgb, 107, 77, 230), 0.2)`;
            e.target.style.transform = "scale(1.02)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = `0 2px 8px rgba(var(--color-accent-rgb, 107, 77, 230), 0.1)`;
            e.target.style.transform = "scale(1)";
          }}
        />

        {/* Search suggestions overlay (can be implemented later) */}
        <div className="absolute top-full left-0 right-0 mt-2 opacity-0 invisible transition-all duration-200">
          <div
            className="rounded-xl shadow-lg border p-2"
            style={{
              backgroundColor: "var(--color-bg)",
              borderColor: "rgba(var(--color-text-rgb, 31, 41, 55), 0.1)",
            }}
          >
            <p className="text-sm opacity-60 p-2">
              Recent searches will appear here
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right side controls */}
      <motion.div
        className="flex items-center space-x-2"
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
            <DropdownMenuItem>🌟 Classic Light</DropdownMenuItem>
            <DropdownMenuItem>🌙 Modern Dark</DropdownMenuItem>
            <DropdownMenuItem>⚡ Minimal Gray</DropdownMenuItem>
            <DropdownMenuItem>💜 Elegant Purple</DropdownMenuItem>
            <DropdownMenuItem>🌸 Vibrant Pink</DropdownMenuItem>
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
              👤 Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg transition-colors duration-200 cursor-pointer">
              💳 Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg transition-colors duration-200 cursor-pointer">
              ⚙️ Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator
              style={{
                backgroundColor: "rgba(var(--color-text-rgb, 31, 41, 55), 0.1)",
              }}
            />
            <DropdownMenuItem className="rounded-lg transition-colors duration-200 cursor-pointer text-red-500">
              🚪 Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </header>
  );
}
