import Link from 'next/link'
import Sandbox from '@/components/Sandbox'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen bg-bg-app text-text-app">
      {/* Header navbar */}
      <header className="w-full border-b border-border-app px-6 py-4 flex items-center justify-between bg-bg-app/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-electric-blue to-accent-purple bg-clip-text text-transparent">
          QuillInsight
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-electric-blue hover:bg-blue-600 text-white transition-all shadow-sm"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-border-app hover:bg-card-app transition-all text-text-app"
            >
              Sign In
            </Link>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 flex flex-col gap-16">
        <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto py-8">
          <div className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
            ✨ AI-Powered Intelligence
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-dark-navy dark:text-white">
            Your Thoughts, <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-electric-blue via-accent-purple to-pink-500 bg-clip-text text-transparent">
              Structured by AI
            </span>
          </h1>
          <p className="text-base sm:text-lg opacity-85 leading-relaxed max-w-2xl">
            A premium note-taking workspace. Write notes, map out strategies, and let custom artificial intelligence instantly summarize key insights, auto-generate organization tags, and extract critical action items.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {user ? (
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-xl bg-electric-blue hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-xl bg-electric-blue hover:bg-blue-600 text-white font-semibold shadow-md hover:shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                Get Started for Free
              </Link>
            )}
            <a
              href="#sandbox"
              className="px-6 py-3.5 rounded-xl border border-border-app bg-card-app text-card-text hover:bg-bg-app font-semibold transition-all"
            >
              Try Sandbox
            </a>
          </div>
        </section>

        {/* Sandbox Playground container */}
        <section id="sandbox" className="scroll-mt-24 flex flex-col gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold">Interactive Sandbox</h2>
            <p className="text-xs sm:text-sm opacity-75">
              Draft notes in the scratch editor below and click the button to see AI-powered summaries, highlights, and tags generate in real-time.
            </p>
          </div>
          <Sandbox />
        </section>

        {/* Features Showcase Grid */}
        <section className="py-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold">Comprehensive Capabilities</h2>
            <p className="text-sm opacity-75">
              Explore advanced note organization combined with seamless, modern utility structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border-app bg-card-app text-card-text hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-electric-blue/10 text-electric-blue flex items-center justify-center font-bold text-lg">
                📂
              </div>
              <h3 className="text-base font-bold">Smart Folders & Tags</h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                Organize your knowledge tree via intuitive folders. Attach custom tags to filter and retrieve documents quickly from a single search dashboard.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border-app bg-card-app text-card-text hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 text-accent-purple flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <h3 className="text-base font-bold">AI Summarizer Panel</h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                Instantly parse large texts. The integrated AI highlights key action items, tags major elements, and presents concise briefs to digest info faster.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border-app bg-card-app text-card-text hover:shadow-lg transition-all flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center font-bold text-lg">
                🎨
              </div>
              <h3 className="text-base font-bold">Personalized Themes</h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                Tailor your space. Swap between 5 beautiful custom-built themes (Classic, Dark, Purple, Eco-Green, Minimalist) with a click in the personalize panel.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border-app py-8 px-6 text-center text-xs opacity-60">
        <p>© {new Date().getFullYear()} QuillInsight. Built using Next.js 16 and Supabase services.</p>
      </footer>
    </div>
  )
}
