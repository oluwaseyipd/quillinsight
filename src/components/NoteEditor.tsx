'use client'

import { useState, useEffect } from 'react'
import { Trash2, Copy, FolderInput, Tag, Sparkles, X, Check, FileText } from 'lucide-react'

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

interface NoteEditorProps {
  note: Note | null
  folders: Array<{ id: string; name: string }>
  onUpdateNote: (id: string, updates: Partial<Note>) => Promise<void>
  onDeleteNote: (id: string) => Promise<void>
  onCloneNote: (note: Note) => Promise<void>
  saveStatus: 'saved' | 'saving' | 'error' | 'draft'
}

export default function NoteEditor({
  note,
  folders,
  onUpdateNote,
  onDeleteNote,
  onCloneNote,
  saveStatus,
}: NoteEditorProps) {
  const [localTitle, setLocalTitle] = useState('')
  const [localContent, setLocalContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [showFolderDropdown, setShowFolderDropdown] = useState(false)
  const [showAiPanel, setShowAiPanel] = useState(false)

  // Sync state with active note selection changes
  useEffect(() => {
    if (note) {
      setLocalTitle(note.title)
      setLocalContent(note.content)
      setTagInput('')
    }
  }, [note?.id])

  // Fire updates to parent whenever title or content changes (triggering auto-save debounce)
  const handleTitleChange = (val: string) => {
    setLocalTitle(val)
    if (note) {
      onUpdateNote(note.id, { title: val })
    }
  }

  const handleContentChange = (val: string) => {
    setLocalContent(val)
    if (note) {
      onUpdateNote(note.id, { content: val })
    }
  }

  // Tag interactions
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (!note || !tagInput.trim()) return

    const sanitized = tagInput.trim().toLowerCase().replace(/#/g, '')
    if (sanitized && !note.tags.includes(sanitized)) {
      const updatedTags = [...note.tags, sanitized]
      onUpdateNote(note.id, { tags: updatedTags })
    }
    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (!note) return
    const updatedTags = note.tags.filter((t) => t !== tagToRemove)
    onUpdateNote(note.id, { tags: updatedTags })
  }

  // Folder interaction
  const handleMoveFolder = async (folderId: string | null) => {
    if (!note) return
    await onUpdateNote(note.id, { folder_id: folderId })
    setShowFolderDropdown(false)
  }

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-70 h-full min-h-[300px]">
        <div className="w-16 h-16 rounded-3xl bg-electric-blue/5 border border-electric-blue/10 flex items-center justify-center text-electric-blue text-2xl mb-4 font-bold">
          🖋️
        </div>
        <h3 className="text-base font-bold mb-1">No note selected</h3>
        <p className="text-xs max-w-xs leading-relaxed">
          Create a new note or choose an existing draft from the list to begin editing your thoughts.
        </p>
      </div>
    )
  }

  const activeFolder = folders.find((f) => f.id === note.folder_id)

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-bg-app">
      {/* Top Editor Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-border-app px-6 py-3 bg-card-app/60 gap-3">
        {/* Auto save indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Status:</span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              saveStatus === 'saving'
                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                : saveStatus === 'saved'
                ? 'bg-success-green/10 text-success-green border border-success-green/20'
                : saveStatus === 'error'
                ? 'bg-error-red/10 text-error-red border border-error-red/20'
                : 'bg-border-app/50 text-text-app/70 border border-border-app/70'
            }`}
          >
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Sync Error' : 'Draft'}
          </span>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Folder dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFolderDropdown(!showFolderDropdown)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-app bg-card-app hover:bg-bg-app text-xs font-semibold cursor-pointer text-text-app"
            >
              <FolderInput size={13} />
              <span className="truncate max-w-[80px]">{activeFolder ? activeFolder.name : 'No Folder'}</span>
            </button>

            {showFolderDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border-app bg-card-app text-card-text shadow-lg z-50 p-1 flex flex-col">
                <button
                  onClick={() => handleMoveFolder(null)}
                  className={`px-3 py-2 text-left text-xs rounded-lg cursor-pointer border-none font-semibold ${
                    !note.folder_id ? 'bg-electric-blue/10 text-electric-blue font-bold' : 'hover:bg-bg-app text-card-text bg-transparent'
                  }`}
                >
                  Unassigned
                </button>
                {folders.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleMoveFolder(f.id)}
                    className={`px-3 py-2 text-left text-xs rounded-lg cursor-pointer border-none font-semibold truncate ${
                      note.folder_id === f.id ? 'bg-electric-blue/10 text-electric-blue font-bold' : 'hover:bg-bg-app text-card-text bg-transparent'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clone note */}
          <button
            onClick={() => onCloneNote(note)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-app bg-card-app hover:bg-bg-app text-xs font-semibold cursor-pointer text-text-app"
            title="Duplicate Note"
          >
            <Copy size={13} />
            <span className="hidden sm:inline">Duplicate</span>
          </button>

          {/* Delete note */}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this note?')) {
                onDeleteNote(note.id)
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-error-red bg-card-app text-error-red hover:bg-error-red/5 text-xs font-semibold cursor-pointer"
            title="Delete Note"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Delete</span>
          </button>

          {/* AI Insights trigger panel toggle */}
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer border-none ${
              showAiPanel
                ? 'bg-accent-purple text-white shadow-sm'
                : 'bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20'
            }`}
          >
            <Sparkles size={13} />
            <span>AI Panel</span>
          </button>
        </div>
      </div>

      {/* Editor Main Canvas & Optional AI sidepanel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Text Area Writing Panel */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          {/* Note Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={localTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full text-2xl font-extrabold bg-transparent outline-none border-none text-text-app placeholder-text-app/40 mb-4"
          />

          {/* Tags Manager list */}
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-border-app/40 pb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-accent-purple/10 border border-accent-purple/20 text-accent-purple"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-500 p-0 border-none bg-transparent cursor-pointer flex items-center justify-center shrink-0"
                >
                  <X size={10} />
                </button>
              </span>
            ))}

            <form onSubmit={handleAddTag} className="inline-flex">
              <input
                type="text"
                placeholder="+ Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="px-2 py-0.5 rounded border border-dashed border-border-app bg-transparent outline-none focus:border-electric-blue text-[10px] text-text-app max-w-[80px]"
              />
            </form>
          </div>

          {/* Text Area Body editor */}
          <textarea
            placeholder="Write your note here... (Markdown supported)"
            value={localContent}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full flex-1 bg-transparent resize-none outline-none border-none text-text-app text-sm leading-relaxed font-sans"
          />
        </div>

        {/* Collapsible AI Panel Placeholder (To be fully connected in Phase 4) */}
        {showAiPanel && (
          <div className="w-80 border-l border-border-app bg-accent-purple/5 p-6 overflow-y-auto flex flex-col gap-6 animate-in slide-in-from-right duration-250">
            <div className="flex items-center justify-between border-b border-border-app pb-3">
              <div className="flex items-center gap-1.5 font-bold text-sm text-accent-purple">
                <Sparkles size={16} />
                <span>AI Insights</span>
              </div>
              <button
                onClick={() => setShowAiPanel(false)}
                className="p-1 hover:bg-border-app/40 text-text-app rounded border-none bg-transparent cursor-pointer flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            {/* Sub-panels display */}
            <div className="flex flex-col gap-5">
              {/* Summary */}
              <div className="p-4 rounded-2xl bg-card-app border border-border-app">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent-purple mb-2">Summary</h4>
                {note.summary ? (
                  <p className="text-xs leading-relaxed">{note.summary}</p>
                ) : (
                  <div className="text-[10px] opacity-60 flex items-center gap-2">
                    <FileText size={12} />
                    <span>No AI summary generated yet.</span>
                  </div>
                )}
              </div>

              {/* Highlights list */}
              <div className="p-4 rounded-2xl bg-card-app border border-border-app">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent-purple mb-2">Key Action Items</h4>
                {note.highlights && note.highlights.length > 0 ? (
                  <ul className="flex flex-col gap-2 pl-0 list-none text-xs leading-relaxed">
                    {note.highlights.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-electric-blue font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-[10px] opacity-60 flex items-center gap-2">
                    <Check size={12} />
                    <span>No action items extracted yet.</span>
                  </div>
                )}
              </div>

              {/* Tag suggestions */}
              <div className="p-4 rounded-2xl bg-card-app border border-border-app">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent-purple mb-2">AI Auto-Tags</h4>
                <div className="text-[10px] opacity-60 leading-relaxed">
                  AI suggested tags appear here. Toggle full execution inside the main editor panel.
                </div>
              </div>
            </div>

            {/* Run Button Panel (Linked in Phase 4) */}
            <div className="mt-auto border-t border-border-app/40 pt-4">
              <button
                disabled
                className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-accent-purple opacity-50 text-white font-semibold text-xs border-none cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} />
                <span>Process Note with AI</span>
              </button>
              <div className="text-[9px] text-center opacity-60 mt-2">
                Note analysis functions will be activated in Phase 4.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
