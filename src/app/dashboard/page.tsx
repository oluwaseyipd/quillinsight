import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch folders on server-side
  const { data: foldersData } = await supabase
    .from('folders')
    .select('*')
    .order('created_at')

  // Fetch notes on server-side
  const { data: notesData } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false })

  // Fetch user profile on server-side
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const profile = profileData || {
    id: user.id,
    username: user.email?.split('@')[0] || 'User',
    avatar_url: null,
    theme_preference: 'theme-classic-light',
  }

  return (
    <DashboardClient
      initialNotes={notesData || []}
      initialFolders={foldersData || []}
      initialProfile={profile}
      userEmail={user.email || ''}
    />
  )
}
