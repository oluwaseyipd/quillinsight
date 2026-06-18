'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (errorParam) {
      setMessage({ type: 'error', text: errorParam })
    }
  }, [errorParam])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
      setLoading(false)
    } else {
      setMessage({ type: 'success', text: 'Signing you in...' })
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    if (username.trim().length < 3) {
      setMessage({ type: 'error', text: 'Username must be at least 3 characters long.' })
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.trim(),
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({
        type: 'success',
        text: 'Account created! Please check your email inbox to verify your account.',
      })
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md p-8 rounded-3xl border border-border-app bg-card-app text-card-text shadow-2xl transition-all duration-300">
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-electric-blue to-accent-purple bg-clip-text text-transparent mb-2">
          QuillInsight
        </Link>
        <p className="text-sm opacity-70">
          {isSignUp ? 'Create a secure new account' : 'Sign in to access your notes'}
        </p>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-xl text-sm mb-6 flex items-start gap-2 border ${
            message.type === 'error'
              ? 'bg-error-red/10 border-error-red text-error-red'
              : 'bg-success-green/10 border-success-green text-success-green'
          }`}
        >
          <span className="font-medium">{message.type === 'error' ? 'Error: ' : 'Success: '}</span>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="flex flex-col gap-4">
        {isSignUp && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider opacity-80" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              placeholder="e.g. johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border-app bg-bg-app text-text-app outline-none focus:border-electric-blue transition-colors text-sm"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider opacity-80" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border-app bg-bg-app text-text-app outline-none focus:border-electric-blue transition-colors text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider opacity-80" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border-app bg-bg-app text-text-app outline-none focus:border-electric-blue transition-colors text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 mt-2 rounded-xl bg-electric-blue hover:bg-blue-600 text-white font-semibold transition-all shadow-md hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50 text-sm border-none flex items-center justify-center"
        >
          {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="opacity-70">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        </span>
        <button
          onClick={() => {
            setIsSignUp(!isSignUp)
            setMessage({ type: '', text: '' })
          }}
          className="text-electric-blue font-semibold hover:underline bg-transparent border-none cursor-pointer p-0 inline"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-bg-app text-text-app">
      <Suspense fallback={
        <div className="text-center opacity-70">
          Loading authentication form...
        </div>
      }>
        <AuthForm />
      </Suspense>
    </div>
  )
}
