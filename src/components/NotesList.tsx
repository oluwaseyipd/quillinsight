'use client'

import { Search, Plus, Calendar, ArrowUpDown, Sparkles, Folder } from 'lucide-react'

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

interface NotesListProps {
  notes: Note[]
  activeNoteId: string | null
  setActiveNoteId: (id: string | null) => void
  onCreateNote: () => Promise<void>
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: 'updated_at' | 'title'
  setSortBy: (sort: 'updated_at' | 'title') => void
  activeFolderId: string | null
  folders: Array<{ id: string; name: string }>
}

export default function NotesList({
  notes,
  activeNoteId,
  setActiveNoteId,
  onCreateNote,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  activeFolderId,
  folders,
}: NotesListProps) {
  // Find name of active folder for header display
  const activeFolderName = activeFolderId
    ? folders.find((f) => f.id === activeFolderId)?.name || 'Folder'
    : 'All Notes'

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
      })
    } catch {
      return ''
    }
  }

  // Strip markdown helper for clean preview text
  const getCleanPreview = (text: string) => {
    if (!text) return 'Empty note...'
    return text
      .replace(/[#*`>_\-]/g, '') // remove markdown symbols
      .replace(/\[.*?\]\(.*?\)/g, '') // remove markdown links
      .trim()
      .substring(0, 80) + (text.length > 80 ? '...' : '')
  }

  return (
    <div className="w-full md:w-80 flex flex-col border-r border-border-app bg-card-app/40 shrink-0 h-full overflow-hidden">
      {/* Header info */}
      <div className="p-4 flex flex-col gap-3.5 border-b border-border-app bg-card-app/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            {activeFolderId && <Folder size={14} className="text-electric-blue shrink-0" />}
            <h2 className="text-sm font-extrabold uppercase tracking-wider truncate">
              {activeFolderName}
            </h2>
          </div>
          <button
            onClick={onCreateNote}
            className="w-8 h-8 rounded-xl bg-electric-blue hover:bg-blue-600 text-white flex items-center justify-center border-none cursor-pointer shadow-sm"
            title="Create Note"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative flex items-center bg-bg-app border border-border-app rounded-xl px-3 py-2 text-xs">
          <Search size={14} className="opacity-60 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-text-app"
          />
        </div>

        {/* Sorting controls */}
        <div className="flex items-center justify-between text-[10px] font-bold opacity-80 border-t border-border-app/40 pt-2.5">
          <span className="opacity-60 uppercase tracking-widest">{notes.length} notes</span>
          <button
            onClick={() => setSortBy(sortBy === 'updated_at' ? 'title' : 'updated_at')}
            className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-text-app hover:text-electric-blue font-bold"
          >
            <ArrowUpDown size={10} />
            <span>Sorted by {sortBy === 'updated_at' ? 'Latest' : 'Title'}</span>
          </button>
        </div>
      </div>

      {/* Notes list items */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 opacity-70 h-full min-h-[200px]">
            <span className="text-2xl mb-2">📝</span>
            <h4 className="text-xs font-bold mb-0.5">No notes found</h4>
            <p className="text-[10px] leading-relaxed max-w-[180px]">
              {searchQuery
                ? 'Try editing your search query or filter settings.'
                : 'Click the "+" button at the top to draft your first note.'}
            </p>
          </div>
        ) : (
          notes.map((note) => {
            const isActive = activeNoteId === note.id
            const hasAiContent = note.summary || note.highlights?.length > 0
            
            return (
              <div
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  isActive
                    ? 'bg-card-app border-electric-blue shadow-md scale-[1.01]'
                    : 'bg-card-app/60 border-border-app hover:border-border-app/80 hover:bg-card-app'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`text-xs font-bold truncate ${isActive ? 'text-electric-blue' : ''}`}>
                    {note.title.trim() || 'Untitled Note'}
                  </h3>
                  {hasAiContent && (
                    <span className="text-accent-purple shrink-0" title="AI processed insights available">
                      <Sparkles size={11} />
                    </span>
                  )}
                </div>

                <p className="text-[11px] opacity-75 mb-3 leading-relaxed break-words line-clamp-2">
                  {getCleanPreview(note.content)}
                </p>

                <div className="flex items-center justify-between text-[9px] font-bold opacity-60 border-t border-border-app/20 pt-2">
                  <span className="flex items-center gap-1" suppressHydrationWarning>
                    <Calendar size={10} />
                    {formatDate(note.updated_at)}
                  </span>

                  {note.tags.length > 0 && (
                    <span className="truncate max-w-[100px] text-accent-purple">
                      #{note.tags[0]}
                      {note.tags.length > 1 ? ` +${note.tags.length - 1}` : ''}
                    </span>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
