"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { Divider } from "@/components/ui/Divider";
import { Alert } from "@/components/ui/Alert";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSignUp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setShowError(false);
    setShowSuccess(false);

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setShowError(true);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setShowError(true);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Unable to create account. Please try again.");
      setShowError(true);
    } else {
      setSuccess("Check your email for verification link!");
      setShowSuccess(true);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setShowError(false);
    setShowSuccess(false);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Unable to sign up with Google.");
      setShowError(true);
    }
    // On success, Supabase will redirect automatically
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
        {/* Enhanced card with better shadows and backdrop blur */}
        <Card className="space-y-8 bg-surface/70 backdrop-blur-xl border-0 shadow-2xl shadow-brand/10 rounded-3xl p-8">
          {/* Brand section with improved typography */}
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
              Create Account
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-text/70 text-center text-base font-medium"
            >
              Join QuillInsight and start your journey
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Alert message={error} type="error" show={showError} />
            <Alert message={success} type="success" show={showSuccess} />
          </motion.div>

          {/* Enhanced Google button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-surface/90 backdrop-blur-sm border border-text/20 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 py-3 font-semibold text-text rounded-2xl group relative overflow-hidden"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <GoogleIcon width={20} height={20} />
              <span>Continue with Google</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Divider text="or create account with email" />
          </motion.div>

          {/* Enhanced form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-6"
            onSubmit={handleSignUp}
          >
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-text mb-2"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-text/20 bg-surface/50 backdrop-blur-sm focus:bg-surface focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-200 placeholder:text-text/50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-text/20 bg-surface/50 backdrop-blur-sm focus:bg-surface focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-200 placeholder:text-text/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-text/20 bg-surface/50 backdrop-blur-sm focus:bg-surface focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-200 placeholder:text-text/50 pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text/50 hover:text-text"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.94 17.94A10.06 10.06 0 0112 19c-5.05 0-9.27-3.11-10.94-7.5a10.06 10.06 0 012.12-3.18m3.18-3.18A10.06 10.06 0 0112 5c5.05 0 9.27 3.11 10.94 7.5a10.06 10.06 0 01-2.12 3.18m-3.18 3.18L3 3"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9S3 17 3 12 7.03 3 12 3s9 4.03 9 9z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-text mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-text/20 bg-surface/50 backdrop-blur-sm focus:bg-surface focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-200 placeholder:text-text/50 pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text/50 hover:text-text"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.94 17.94A10.06 10.06 0 0112 19c-5.05 0-9.27-3.11-10.94-7.5a10.06 10.06 0 012.12-3.18m3.18-3.18A10.06 10.06 0 0112 5c5.05 0 9.27 3.11 10.94 7.5a10.06 10.06 0 01-2.12 3.18m-3.18 3.18L3 3"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9S3 17 3 12 7.03 3 12 3s9 4.03 9 9z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Password strength indicator */}
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-text/70 bg-surface/80 rounded-lg p-3"
              >
                <div className="space-y-1">
                  <div
                    className={`flex items-center gap-2 ${password.length >= 6 ? "text-green-600" : "text-text/50"}`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full ${password.length >= 6 ? "bg-green-500" : "bg-text/30"}`}
                    ></div>
                    At least 6 characters
                  </div>
                  <div
                    className={`flex items-center gap-2 ${password !== confirmPassword || !confirmPassword ? "text-text/50" : password === confirmPassword ? "text-green-600" : "text-red-500"}`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full ${password !== confirmPassword || !confirmPassword ? "bg-text/30" : password === confirmPassword ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    Passwords match
                  </div>
                </div>
              </motion.div>
            )}

            {/* Enhanced submit button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-brand to-accent hover:from-brand-dark hover:to-accent-dark text-white font-semibold py-3 rounded-xl shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </span>
            </Button>
          </motion.form>

          {/* Enhanced footer links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex justify-center items-center text-sm pt-2"
          >
            <span className="text-text/70">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-brand hover:text-brand-dark font-semibold hover:underline transition-colors duration-200"
              >
                Sign In
              </a>
            </span>
          </motion.div>

          {/* Terms and Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="text-center text-xs text-text/50 leading-relaxed"
          >
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-brand hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-brand hover:underline">
              Privacy Policy
            </a>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
