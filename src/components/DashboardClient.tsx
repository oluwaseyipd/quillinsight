'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Sidebar from '@/components/Sidebar'
import NotesList from '@/components/NotesList'
import NoteEditor from '@/components/NoteEditor'
import { Sparkles, Palette, Check } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  summary: string | null
  highlights: string[]
  updated_at: string
  folder_id: string | null
}

interface Folder {
  id: string
  name: string
}

interface Profile {
  id: string
  username: string | null
  avatar_url: string | null
  theme_preference: string
}

interface DashboardClientProps {
  initialNotes: Note[]
  initialFolders: Folder[]
  initialProfile: Profile
  userEmail: string
}

export default function DashboardClient({
  initialNotes,
  initialFolders,
  initialProfile,
  userEmail,
}: DashboardClientProps) {
  const router = useRouter()
  const saveTimersRef = useRef<{ [key: string]: NodeJS.Timeout }>({})

  // Core data states
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [profile, setProfile] = useState<Profile>(initialProfile)

  // Navigation / Filter states
  const [activeTab, setActiveTab] = useState<'notes' | 'settings'>('notes')
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'updated_at' | 'title'>('updated_at')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | 'draft'>('saved')

  // Theme preference initialization
  const [activeTheme, setActiveTheme] = useState(initialProfile.theme_preference || 'theme-classic-light')

  useEffect(() => {
    const localTheme = localStorage.getItem('quillinsight-theme') || activeTheme
    setActiveTheme(localTheme)
    document.documentElement.className = localTheme
  }, [])

  const handleThemeChange = async (newTheme: string) => {
    setActiveTheme(newTheme)
    localStorage.setItem('quillinsight-theme', newTheme)
    document.documentElement.className = newTheme

    // Update database
    const supabase = createClient()
    await supabase.from('profiles').update({ theme_preference: newTheme }).eq('id', profile.id)
    setProfile((p) => ({ ...p, theme_preference: newTheme }))
  }

  // Handle Client Sign Out
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // Dynamic tags aggregation from notes
  const uniqueTags = useMemo(() => {
    const counts: { [key: string]: number } = {}
    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return Object.keys(counts).map((name) => ({ name, count: counts[name] }))
  }, [notes])

  // Filter & Sort Notes
  const filteredAndSortedNotes = useMemo(() => {
    let result = [...notes]

    // Folder filter
    if (activeFolderId) {
      result = result.filter((note) => note.folder_id === activeFolderId)
    }

    // Tag filter
    if (activeTag) {
      result = result.filter((note) => note.tags.includes(activeTag))
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)
      )
    }

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'updated_at') {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

    return result
  }, [notes, activeFolderId, activeTag, searchQuery, sortBy])

  // Set first note as active on load if notes list is not empty
  useEffect(() => {
    if (filteredAndSortedNotes.length > 0 && !activeNoteId) {
      setActiveNoteId(filteredAndSortedNotes[0].id)
    } else if (filteredAndSortedNotes.length === 0) {
      setActiveNoteId(null)
    }
  }, [activeFolderId, activeTag])

  // Folders CRUD Actions
  const handleCreateFolder = async (name: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('folders')
      .insert({ name, user_id: profile.id })
      .select()
      .single()

    if (!error && data) {
      setFolders((prev) => [...prev, data])
    }
  }

  const handleRenameFolder = async (id: string, name: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('folders')
      .update({ name })
      .eq('id', id)

    if (!error) {
      setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)))
    }
  }

  const handleDeleteFolder = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase.from('folders').delete().eq('id', id)

    if (!error) {
      setFolders((prev) => prev.filter((f) => f.id !== id))
      // Detach notes associated with the deleted folder locally
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.folder_id === id ? { ...n, folder_id: null } : n))
      )
      if (activeFolderId === id) {
        setActiveFolderId(null)
      }
    }
  }

  // Notes CRUD Actions
  const handleCreateNote = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: profile.id,
        folder_id: activeFolderId,
        title: 'Untitled Note',
        content: '',
        tags: activeTag ? [activeTag] : [],
      })
      .select()
      .single()

    if (!error && data) {
      setNotes((prev) => [data, ...prev])
      setActiveNoteId(data.id)
      setActiveTab('notes')
    }
  }

  const handleDeleteNote = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase.from('notes').delete().eq('id', id)

    if (!error) {
      setNotes((prev) => prev.filter((n) => n.id !== id))
      if (activeNoteId === id) {
        setActiveNoteId(null)
      }
    }
  }

  const handleCloneNote = async (sourceNote: Note) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: profile.id,
        folder_id: sourceNote.folder_id,
        title: `${sourceNote.title} (Copy)`,
        content: sourceNote.content,
        tags: sourceNote.tags,
      })
      .select()
      .single()

    if (!error && data) {
      setNotes((prev) => [data, ...prev])
      setActiveNoteId(data.id)
    }
  }

  // Debounced Auto-Save Update Note Action
  const handleUpdateNote = async (id: string, updates: Partial<Note>) => {
    // Optimistic Update local memory immediately so list view and inputs align
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === id ? { ...n, ...updates, updated_at: new Date().toISOString() } : n))
    )

    // Clear previous save timers for this note
    if (saveTimersRef.current[id]) {
      clearTimeout(saveTimersRef.current[id])
    }

    setSaveStatus('saving')

    saveTimersRef.current[id] = setTimeout(async () => {
      try {
        const supabase = createClient()
        const { error } = await supabase
          .from('notes')
          .update(updates)
          .eq('id', id)

        if (error) {
          setSaveStatus('error')
        } else {
          setSaveStatus('saved')
        }
      } catch (err) {
        setSaveStatus('error')
      }
    }, 750) // 750ms debounce window
  }

  // Find active note details
  const activeNote = notes.find((n) => n.id === activeNoteId) || null

  const profileWithEmail = { ...profile, email: userEmail }

  return (
    <div className="flex-1 flex overflow-hidden h-screen bg-bg-app text-text-app">
      {/* Collapsible sidebar */}
      <Sidebar
        folders={folders}
        activeFolderId={activeFolderId}
        setActiveFolderId={setActiveFolderId}
        onCreateFolder={handleCreateFolder}
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
        tags={uniqueTags}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        profile={profileWithEmail}
        onSignOut={handleSignOut}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main workspaces */}
      {activeTab === 'notes' ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Notes list selection panel */}
          <NotesList
            notes={filteredAndSortedNotes}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            onCreateNote={handleCreateNote}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeFolderId={activeFolderId}
            folders={folders}
          />

          {/* Active note editing panel */}
          <NoteEditor
            note={activeNote}
            folders={folders}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            onCloneNote={handleCloneNote}
            saveStatus={saveStatus}
          />
        </div>
      ) : (
        /* Settings (Personalization Workspace) stub - Linked to Phase 5 themes switcher */
        <div className="flex-1 flex flex-col p-8 overflow-y-auto bg-bg-app">
          <div className="max-w-xl mx-auto w-full">
            <h1 className="text-2xl font-bold flex items-center gap-2 border-b border-border-app pb-4 mb-6">
              <Palette className="text-electric-blue" />
              <span>Personalize Workspace</span>
            </h1>

            <div className="flex flex-col gap-6 bg-card-app p-6 rounded-2xl border border-border-app text-card-text">
              <div>
                <h3 className="text-sm font-extrabold mb-1">Select Custom Theme</h3>
                <p className="text-xs opacity-75 mb-4 leading-relaxed">
                  Choose a visual color system below to customize dashboard backgrounds, card colors, text, and active highlight buttons.
                </p>

                {/* Grid list of 5 themes */}
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'theme-classic-light', name: 'Classic Light', bg: 'bg-[#F8FAFC]', text: 'text-[#0F172A]', primary: '#3B82F6' },
                    { id: 'theme-professional-dark', name: 'Professional Dark', bg: 'bg-[#0F172A]', text: 'text-[#F8FAFC]', primary: '#3B82F6' },
                    { id: 'theme-modern-purple', name: 'Modern Purple', bg: 'bg-[#1E1B4B]', text: 'text-[#EDE9FE]', primary: '#8B5CF6' },
                    { id: 'theme-eco-green', name: 'Eco Green', bg: 'bg-[#ECFDF5]', text: 'text-[#064E3B]', primary: '#22C55E' },
                    { id: 'theme-minimal-gray', name: 'Minimal Gray', bg: 'bg-[#F1F5F9]', text: 'text-[#1E293B]', primary: '#3B82F6' },
                  ].map((t) => {
                    const isSelected = activeTheme === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleThemeChange(t.id)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-electric-blue bg-bg-app/80 shadow-md'
                            : 'border-border-app bg-bg-app/40 hover:bg-bg-app/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg ${t.bg} border border-border-app flex items-center justify-center font-bold text-xs shrink-0 ${t.text}`}>
                            A
                          </span>
                          <span className="text-xs font-semibold">{t.name}</span>
                        </div>
                        {isSelected && (
                          <span className="text-electric-blue shrink-0">
                            <Check size={16} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
