import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8 bg-bg-app text-text-app">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border-app bg-card-app text-card-text shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-electric-blue">QuillInsight Dashboard</h1>
        <p className="text-sm opacity-80 mb-6">
          This is a placeholder dashboard. The full note management and folder hierarchy will be implemented in Phase 3.
        </p>

        <div className="p-4 rounded-lg bg-bg-app text-text-app mb-6 font-mono text-xs overflow-x-auto">
          <div><strong>User Email:</strong> {user.email}</div>
          <div className="mt-2"><strong>User ID:</strong> {user.id}</div>
        </div>

        <form action={signOut} className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 rounded-lg bg-electric-blue hover:bg-blue-600 text-white font-medium transition-all cursor-pointer shadow-md hover:shadow-blue-500/20 text-center border-none"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}
