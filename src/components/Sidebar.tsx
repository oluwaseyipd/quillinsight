'use client'

import { useState } from 'react'
import { Folder, Tag, Settings, LogOut, Plus, Trash2, Edit2, Check, X, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import ConfirmationModal from './ConfirmationModal'

interface SidebarProps {
  folders: Array<{ id: string; name: string }>
  activeFolderId: string | null
  setActiveFolderId: (id: string | null) => void
  onCreateFolder: (name: string) => Promise<void>
  onRenameFolder: (id: string, newName: string) => Promise<void>
  onDeleteFolder: (id: string) => Promise<void>
  tags: Array<{ name: string; count: number }>
  activeTag: string | null
  setActiveTag: (tag: string | null) => void
  profile: { username: string | null; avatar_url: string | null; email: string }
  onSignOut: () => Promise<void>
  activeTab: 'notes' | 'settings'
  setActiveTab: (tab: 'notes' | 'settings') => void
}

export default function Sidebar({
  folders,
  activeFolderId,
  setActiveFolderId,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  tags,
  activeTag,
  setActiveTag,
  profile,
  onSignOut,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null)
  const [editFolderName, setEditFolderName] = useState('')
  const [folderToDelete, setFolderToDelete] = useState<{ id: string; name: string } | null>(null)

  const handleCreateFolderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFolderName.trim()) return
    await onCreateFolder(newFolderName.trim())
    setNewFolderName('')
    setIsCreatingFolder(false)
  }

  const startRenameFolder = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingFolderId(id)
    setEditFolderName(name)
  }

  const handleRenameFolderSubmit = async (id: string, e: React.FormEvent) => {
    e.preventDefault()
    if (!editFolderName.trim()) return
    await onRenameFolder(id, editFolderName.trim())
    setEditingFolderId(null)
  }

  return (
    <div
      className={`relative flex flex-col border-r border-border-app bg-sidebar-bg text-sidebar-text transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full border border-border-app bg-card-app text-card-text flex items-center justify-center cursor-pointer shadow-sm z-40 hover:bg-bg-app"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Profile / Logo Panel */}
      <div className={`p-4 border-b border-border-app flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electric-blue to-accent-purple flex items-center justify-center text-white font-extrabold text-sm shrink-0">
          Q
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate">
              {profile.username || 'User'}
            </span>
            <span className="text-[10px] opacity-60 truncate">
              {profile.email}
            </span>
          </div>
        )}
      </div>

      {/* Main navigation section */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6">
        {/* Navigation Categories */}
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => {
              setActiveTab('notes')
              setActiveFolderId(null)
              setActiveTag(null)
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
              activeTab === 'notes' && !activeFolderId && !activeTag
                ? 'bg-electric-blue text-white shadow-sm'
                : 'hover:bg-bg-app opacity-85'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <FileText size={16} />
            {!collapsed && <span>All Notes</span>}
          </button>
        </div>

        {/* Folders Category */}
        <div className="flex flex-col gap-2">
          {!collapsed && (
            <div className="flex items-center justify-between px-3 text-[10px] font-extrabold uppercase tracking-widest opacity-60">
              <span>Folders</span>
              <button
                onClick={() => setIsCreatingFolder(!isCreatingFolder)}
                className="hover:text-electric-blue bg-transparent border-none cursor-pointer p-0"
              >
                <Plus size={14} />
              </button>
            </div>
          )}

          {isCreatingFolder && !collapsed && (
            <form onSubmit={handleCreateFolderSubmit} className="px-3 py-1 flex items-center gap-1.5">
              <input
                type="text"
                autoFocus
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-border-app bg-bg-app text-text-app outline-none focus:border-electric-blue"
              />
              <button
                type="submit"
                className="w-7 h-7 rounded-lg bg-electric-blue text-white flex items-center justify-center border-none cursor-pointer"
              >
                <Check size={12} />
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingFolder(false)}
                className="w-7 h-7 rounded-lg bg-border-app text-text-app flex items-center justify-center border-none cursor-pointer"
              >
                <X size={12} />
              </button>
            </form>
          )}

          <div className="flex flex-col gap-1">
            {folders.map((folder) => {
              const isActive = activeFolderId === folder.id
              const isEditing = editingFolderId === folder.id

              if (isEditing && !collapsed) {
                return (
                  <form
                    key={folder.id}
                    onSubmit={(e) => handleRenameFolderSubmit(folder.id, e)}
                    className="px-3 py-1 flex items-center gap-1.5"
                  >
                    <input
                      type="text"
                      autoFocus
                      value={editFolderName}
                      onChange={(e) => setEditFolderName(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-border-app bg-bg-app text-text-app outline-none focus:border-electric-blue"
                    />
                    <button
                      type="submit"
                      className="w-7 h-7 rounded-lg bg-success-green text-white flex items-center justify-center border-none cursor-pointer"
                    >
                      <Check size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingFolderId(null)}
                      className="w-7 h-7 rounded-lg bg-border-app text-text-app flex items-center justify-center border-none cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </form>
                )
              }

              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    setActiveTab('notes')
                    setActiveFolderId(folder.id)
                    setActiveTag(null)
                  }}
                  className={`w-full group flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer border-none ${
                    isActive ? 'bg-electric-blue/10 text-electric-blue font-semibold border-l-2 border-electric-blue' : 'hover:bg-bg-app opacity-85 text-sidebar-text'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Folder size={16} className={isActive ? 'text-electric-blue' : 'opacity-70'} />
                    {!collapsed && <span className="truncate">{folder.name}</span>}
                  </div>

                  {!collapsed && !isEditing && (
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity shrink-0">
                      <span
                        onClick={(e) => startRenameFolder(folder.id, folder.name, e)}
                        className="p-1 rounded hover:bg-border-app text-text-app/70 hover:text-text-app cursor-pointer"
                        title="Rename"
                      >
                        <Edit2 size={11} />
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          setFolderToDelete({ id: folder.id, name: folder.name })
                        }}
                        className="p-1 rounded hover:bg-red-500/10 text-red-500/80 hover:text-red-500 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={11} />
                      </span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tags Category */}
        {tags.length > 0 && (
          <div className="flex flex-col gap-2">
            {!collapsed && (
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest opacity-60">
                Tags
              </div>
            )}
            <div className="flex flex-col gap-1">
              {tags.map((tag) => {
                const isActive = activeTag === tag.name
                return (
                  <button
                    key={tag.name}
                    onClick={() => {
                      setActiveTab('notes')
                      setActiveTag(isActive ? null : tag.name)
                      setActiveFolderId(null)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer border-none ${
                      isActive ? 'bg-accent-purple/10 text-accent-purple font-semibold' : 'hover:bg-bg-app opacity-85 text-sidebar-text'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Tag size={16} className={isActive ? 'text-accent-purple' : 'opacity-70'} />
                      {!collapsed && <span className="truncate">#{tag.name}</span>}
                    </div>
                    {!collapsed && (
                      <span className="text-[10px] font-semibold bg-bg-app px-2 py-0.5 rounded-full opacity-70">
                        {tag.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer controls panel */}
      <div className="p-3 border-t border-border-app flex flex-col gap-1 bg-bg-app/20">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-none ${
            activeTab === 'settings' ? 'bg-electric-blue/10 text-electric-blue' : 'hover:bg-bg-app opacity-85 text-sidebar-text'
          } ${collapsed ? 'justify-center' : ''}`}
        >
          <Settings size={16} />
          {!collapsed && <span>Personalize</span>}
        </button>

        <button
          onClick={onSignOut}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold hover:bg-red-500/10 text-red-500 transition-all cursor-pointer border-none ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={16} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      <ConfirmationModal
        isOpen={folderToDelete !== null}
        title="Delete Folder"
        message={`Are you sure you want to delete folder "${folderToDelete?.name}"? All notes inside this folder will be unassigned.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={async () => {
          if (folderToDelete) {
            await onDeleteFolder(folderToDelete.id)
            setFolderToDelete(null)
          }
        }}
        onCancel={() => setFolderToDelete(null)}
        isDanger={true}
      />
    </div>
  )
}
