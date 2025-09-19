import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlertProps {
  message: string;
  type?: "error" | "success" | "info";
  show: boolean;
  className?: string;
}

const typeStyles: Record<string, string> = {
  error: "bg-red-50 border-red-300 text-red-700",
  success: "bg-green-50 border-green-300 text-green-700",
  info: "bg-blue-50 border-blue-300 text-blue-700",
};

export const Alert: React.FC<AlertProps> = ({
  message,
  type = "error",
  show,
  className = "",
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3 }}
        className={`w-full border rounded-lg px-4 py-3 mb-2 text-sm font-medium ${typeStyles[type]} ${className}`}
        role="alert"
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

export default Alert;
