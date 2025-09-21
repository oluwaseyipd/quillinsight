"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { motion } from "framer-motion";
import Link from "next/link";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/auth/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase]);

  const handleUpdatePassword = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setShowAlert(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setShowAlert(true);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setShowAlert(true);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to update password.");
      setShowAlert(true);
    } else {
      setMessage("Your password has been updated successfully!");
      setShowAlert(true);
      setPassword("");
      setConfirmPassword("");
      // Optionally redirect to login or dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-background">
      {/* Enhanced background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/30 to-background" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand/10 to-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-accent/10 to-brand/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="space-y-8 bg-surface/70 backdrop-blur-xl border-0 shadow-2xl shadow-brand/10 rounded-3xl p-8">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img
                src="/images/logo.png"
                alt="QuillInsight Logo"
                className="h-1/2 w-auto"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold bg-gradient-to-r from-text to-text/80 bg-clip-text text-transparent"
            >
              Set New Password
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-text/70 text-center text-base font-medium"
            >
              Enter your new password below.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {showAlert && (error ? (
              <Alert message={error} type="error" show={showAlert} />
            ) : (
              <Alert message={message} type="success" show={showAlert} />
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-6"
            onSubmit={handleUpdatePassword}
          >
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text mb-2"
              >
                New Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-text/20 bg-surface/50 backdrop-blur-sm focus:bg-surface focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-200 placeholder:text-text/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-text mb-2"
              >
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-text/20 bg-surface/50 backdrop-blur-sm focus:bg-surface focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-200 placeholder:text-text/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-brand to-accent hover:from-brand-dark hover:to-accent-dark text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Password...
                  </div>
                ) : (
                  "Update Password"
                )}
              </span>
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex justify-center text-sm pt-2"
          >
            <Link
              href="/auth/login"
              className="text-brand hover:text-brand-dark font-medium hover:underline transition-colors duration-200"
            >
              Back to Login
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
