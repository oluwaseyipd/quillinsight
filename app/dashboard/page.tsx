'use client'

import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { session } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
    }
  }, [session, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (!session) {
    return null
  }

  return (
    <main className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Sign Out
        </button>
      </div>
      {/* TODO: Render NoteCard components for each note */}
      <div className="grid gap-4">
        {/* Placeholder for notes list */}
        <div className="text-muted-foreground">
          No notes yet. Start by creating a new note!
        </div>
      </div>
    </main>
  )
}