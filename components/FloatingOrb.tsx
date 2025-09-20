"use client";
import { motion } from "framer-motion";

// Floating orbs for visual interest
const FloatingOrb = ({
  size = "w-32 h-32",
  color = "bg-brand/10",
  delay = 0,
  duration = 20,
}) => (
  <motion.div
    className={`absolute rounded-full blur-xl ${size} ${color}`}
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -80, 50, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

export default FloatingOrb;
