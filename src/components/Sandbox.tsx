'use client'

import { useState } from 'react'

export default function Sandbox() {
  const [content, setContent] = useState(
    `# Product Launch Strategy & Objectives\n\nWe need to align on the core steps for our upcoming Q3 product release:\n\n1. Early Beta Release: Schedule a locked developer beta by August 15th to gather initial feedback.\n2. Analytics & Tracking: Configure Google Analytics and Mixpanel endpoints to track user retention.\n3. Dark Mode & Styling: Design a premium, custom glassmorphism visual layout with dynamic custom themes.\n4. Documentation: Write standard README and onboarding documentation guides for new users.`
  )
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    summary: string
    tags: string[]
    takeaways: string[]
  } | null>(null)
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'insights'>('split')
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    if (!content.trim()) {
      setError('Please write some content first.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/ai/demo-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const data = await response.json()
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Failed to generate AI insights.')
      }
    } catch (err) {
      setError('A network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-3xl border border-border-app bg-card-app text-card-text shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-border-app px-6 py-4 bg-bg-app/40 gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-xs font-semibold opacity-70 ml-2 uppercase tracking-widest">Sandbox Editor</span>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-bg-app border border-border-app text-xs font-semibold">
          <button
            onClick={() => setViewMode('editor')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer border-none ${
              viewMode === 'editor' ? 'bg-electric-blue text-white shadow-sm' : 'opacity-70 hover:opacity-100 bg-transparent text-text-app'
            }`}
          >
            Editor Only
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`hidden md:inline px-3 py-1.5 rounded-md transition-all cursor-pointer border-none ${
              viewMode === 'split' ? 'bg-electric-blue text-white shadow-sm' : 'opacity-70 hover:opacity-100 bg-transparent text-text-app'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('insights')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer border-none ${
              viewMode === 'insights' ? 'bg-electric-blue text-white shadow-sm' : 'opacity-70 hover:opacity-100 bg-transparent text-text-app'
            }`}
          >
            AI Insights {result && <span className="ml-1 w-2 h-2 rounded-full bg-accent-purple inline-block"></span>}
          </button>
        </div>
      </div>

      {/* Editor & Insights Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-app min-h-[400px]">
        {/* Editor Panel */}
        <div className={`p-6 flex flex-col ${viewMode === 'insights' ? 'hidden' : 'block'}`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your notes here..."
            className="w-full flex-1 min-h-[300px] bg-transparent resize-none border-none outline-none text-card-text text-sm font-sans leading-relaxed"
          />
          <div className="flex items-center justify-between border-t border-border-app pt-4 mt-4">
            <span className="text-xs opacity-60">
              {content.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              onClick={handleSummarize}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-blue to-accent-purple hover:opacity-90 text-white font-semibold shadow-md transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50 text-xs border-none"
            >
              {loading ? 'AI Working...' : 'Summarize with AI'}
            </button>
          </div>
        </div>

        {/* Insights Panel */}
        <div className={`p-6 bg-bg-app/20 flex flex-col justify-between ${viewMode === 'editor' ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex-1">
            {error && (
              <div className="p-4 rounded-xl border border-error-red bg-error-red/10 text-error-red text-xs mb-4">
                {error}
              </div>
            )}

            {!result && !loading && !error && (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[260px] opacity-65 p-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple text-xl mb-3 font-semibold">
                  🪄
                </div>
                <h4 className="text-sm font-bold mb-1">Waiting for content</h4>
                <p className="text-xs max-w-xs leading-relaxed">
                  Write some notes in the editor and click "Summarize with AI" to generate real-time summaries, tags, and takeaways.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col gap-6 animate-pulse">
                <div>
                  <div className="h-4 bg-border-app rounded-md w-1/4 mb-3"></div>
                  <div className="h-3 bg-border-app rounded-md w-full mb-2"></div>
                  <div className="h-3 bg-border-app rounded-md w-5/6"></div>
                </div>
                <div>
                  <div className="h-4 bg-border-app rounded-md w-1/4 mb-3"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-border-app rounded-full w-16"></div>
                    <div className="h-6 bg-border-app rounded-full w-20"></div>
                    <div className="h-6 bg-border-app rounded-full w-14"></div>
                  </div>
                </div>
                <div>
                  <div className="h-4 bg-border-app rounded-md w-1/3 mb-3"></div>
                  <div className="h-3 bg-border-app rounded-md w-full mb-2"></div>
                  <div className="h-3 bg-border-app rounded-md w-11/12 mb-2"></div>
                  <div className="h-3 bg-border-app rounded-md w-4/5"></div>
                </div>
              </div>
            )}

            {result && (
              <div className="flex flex-col gap-6">
                {/* Summary section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-2">AI Summary</h4>
                  <p className="text-sm leading-relaxed font-medium">{result.summary}</p>
                </div>

                {/* Tags section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-2.5">Auto Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-accent-purple/10 border border-accent-purple/20 text-accent-purple"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Takeaways section */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-2.5">Key Highlights</h4>
                  <ul className="flex flex-col gap-2.5 pl-0 list-none text-sm leading-relaxed">
                    {result.takeaways.map((takeaway, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="w-5 h-5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sandbox CTA Footer */}
          {result && (
            <div className="border-t border-border-app pt-4 mt-6">
              <div className="p-4 rounded-xl bg-electric-blue/5 border border-electric-blue/10 text-xs">
                💡 <strong>Like what you see?</strong> Register for a secure account to organize notes in folders, edit dynamically, and persist your work.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
