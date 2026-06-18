'use client'

import { useState, useEffect } from 'react'
import { Trash2, Copy, FolderInput, Tag, Sparkles, X, Check, FileText, Edit } from 'lucide-react'
import ConfirmationModal from './ConfirmationModal'

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

  // AI states
  const [loadingAi, setLoadingAi] = useState(false)
  const [aiError, setAiError] = useState('')
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])

  // Mode states
  const [readerMode, setReaderMode] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Sync state with active note selection changes
  useEffect(() => {
    if (note) {
      setLocalTitle(note.title)
      setLocalContent(note.content)
      setTagInput('')
      setAiError('')
      setSuggestedTags([])
      setReaderMode(false)
      setShowDeleteConfirm(false)
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

  const handleAddSuggestedTag = (tag: string) => {
    if (!note) return
    if (!note.tags.includes(tag)) {
      const updatedTags = [...note.tags, tag]
      onUpdateNote(note.id, { tags: updatedTags })
    }
    setSuggestedTags((prev) => prev.filter((t) => t !== tag))
  }

  // Folder interaction
  const handleMoveFolder = async (folderId: string | null) => {
    if (!note) return
    await onUpdateNote(note.id, { folder_id: folderId })
    setShowFolderDropdown(false)
  }

  // Trigger AI Analysis
  const handleAnalyzeNote = async () => {
    if (!note || !localContent.trim()) return

    setLoadingAi(true)
    setAiError('')
    setSuggestedTags([])

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: localContent }),
      })

      const data = await response.json()
      if (response.ok) {
        // Save insights directly in database Note record
        await onUpdateNote(note.id, {
          summary: data.summary,
          highlights: data.takeaways,
        })
        // Set local tag suggestions
        if (data.tags && Array.isArray(data.tags)) {
          const uniqueSuggested = data.tags.filter((t: string) => !note.tags.includes(t))
          setSuggestedTags(uniqueSuggested)
        }
      } else {
        setAiError(data.error || 'Failed to analyze note content.')
      }
    } catch (err) {
      setAiError('A network error occurred. Please try again.')
    } finally {
      setLoadingAi(false)
    }
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
        <div className="flex items-center gap-3">
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
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Reader View Toggle */}
          <button
            onClick={() => setReaderMode(!readerMode)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer border ${
              readerMode
                ? 'bg-electric-blue/10 text-electric-blue border-electric-blue/20'
                : 'border-border-app bg-card-app hover:bg-bg-app text-text-app'
            }`}
          >
            {readerMode ? <Edit size={13} /> : <FileText size={13} />}
            <span>{readerMode ? 'Edit Mode' : 'Reader Mode'}</span>
          </button>

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
            onClick={() => setShowDeleteConfirm(true)}
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
            disabled={readerMode}
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
                {!readerMode && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500 p-0 border-none bg-transparent cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <X size={10} />
                  </button>
                )}
              </span>
            ))}

            {!readerMode && (
              <form onSubmit={handleAddTag} className="inline-flex">
                <input
                  type="text"
                  placeholder="+ Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="px-2 py-0.5 rounded border border-dashed border-border-app bg-transparent outline-none focus:border-electric-blue text-[10px] text-text-app max-w-[80px]"
                />
              </form>
            )}
          </div>

          {/* Text Area Body editor or AI-enhanced reader mode */}
          {readerMode ? (
            <div className="w-full flex-1 overflow-y-auto pr-2 flex flex-col gap-6">
              {/* AI Summary Banner */}
              {note.summary && (
                <div className="p-5 rounded-2xl bg-accent-purple/5 border border-accent-purple/10 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-extrabold text-accent-purple text-[10px] uppercase tracking-wider mb-2">
                    <Sparkles size={12} />
                    <span>AI Executive Summary</span>
                  </div>
                  <p className="leading-relaxed font-medium italic opacity-90">"{note.summary}"</p>
                </div>
              )}

              {/* Action items / Highlights */}
              {note.highlights && note.highlights.length > 0 && (
                <div className="p-5 rounded-2xl bg-electric-blue/5 border border-electric-blue/10 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-extrabold text-electric-blue text-[10px] uppercase tracking-wider mb-3">
                    <Check size={12} />
                    <span>Key Takeaways & Highlights</span>
                  </div>
                  <ul className="flex flex-col gap-2.5 pl-0 list-none leading-relaxed">
                    {note.highlights.map((item, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="w-4 h-4 rounded-full bg-electric-blue/20 text-electric-blue text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Note Content (formatted preview) */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest opacity-50">Note Body</h4>
                <div className="text-sm leading-relaxed font-sans whitespace-pre-wrap text-text-app">
                  {localContent || <span className="opacity-50 italic">No content written yet.</span>}
                </div>
              </div>
            </div>
          ) : (
            <textarea
              placeholder="Write your note here... (Markdown supported)"
              value={localContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full flex-1 bg-transparent resize-none outline-none border-none text-text-app text-sm leading-relaxed font-sans"
            />
          )}
        </div>

        {/* Collapsible AI Panel */}
        {showAiPanel && (
          <div className="w-80 border-l border-border-app bg-accent-purple/5 p-6 overflow-y-auto flex flex-col gap-6 animate-in slide-in-from-right duration-250 shrink-0">
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
              <div className="p-4 rounded-2xl bg-card-app border border-border-app text-card-text">
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
              <div className="p-4 rounded-2xl bg-card-app border border-border-app text-card-text">
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
              <div className="p-4 rounded-2xl bg-card-app border border-border-app text-card-text">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent-purple mb-2">AI Suggested Tags</h4>
                {suggestedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleAddSuggestedTag(tag)}
                        className="px-2 py-1 rounded text-[10px] bg-electric-blue/10 border border-electric-blue/20 text-electric-blue hover:bg-electric-blue hover:text-white transition-all cursor-pointer font-bold border-none"
                      >
                        +#{tag}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-[10px] opacity-60">
                    {note.summary ? 'No further tags suggested.' : 'Suggested tags will appear after processing.'}
                  </div>
                )}
              </div>
            </div>

            {/* Run Button Panel */}
            <div className="mt-auto border-t border-border-app/40 pt-4">
              {aiError && (
                <div className="p-3 rounded-xl border border-error-red bg-error-red/10 text-error-red text-[10px] mb-3 leading-relaxed">
                  {aiError}
                </div>
              )}

              <button
                onClick={handleAnalyzeNote}
                disabled={loadingAi || !localContent.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-blue to-accent-purple text-white font-semibold text-xs border-none cursor-pointer flex items-center justify-center gap-1.5 hover:opacity-90 shadow-md hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={14} className={loadingAi ? 'animate-spin' : ''} />
                <span>{loadingAi ? 'AI Processing...' : 'Process Note with AI'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Delete Note"
        message={`Are you sure you want to delete the note "${note.title || 'Untitled'}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={async () => {
          await onDeleteNote(note.id)
          setShowDeleteConfirm(false)
        }}
        onCancel={() => setShowDeleteConfirm(false)}
        isDanger={true}
      />
    </div>
  )
}
