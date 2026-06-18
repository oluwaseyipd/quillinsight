import { X, AlertTriangle } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isDanger?: boolean
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card-app text-card-text rounded-3xl border border-border-app p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-sm">
            {isDanger ? (
              <AlertTriangle className="text-error-red shrink-0" size={18} />
            ) : (
              <span className="text-xl">💡</span>
            )}
            <span className="text-text-app">{title}</span>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-bg-app rounded text-text-app/70 hover:text-text-app cursor-pointer border-none bg-transparent flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* Message */}
        <p className="text-xs sm:text-sm leading-relaxed opacity-85 text-text-app">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3.5 border-t border-border-app/40 pt-4 mt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-border-app bg-card-app hover:bg-bg-app text-xs font-semibold cursor-pointer text-text-app"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2.5 rounded-xl text-white font-semibold text-xs border-none cursor-pointer transition-all shadow-sm ${
              isDanger
                ? 'bg-error-red hover:bg-red-600 shadow-red-500/10'
                : 'bg-electric-blue hover:bg-blue-600 shadow-blue-500/10'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
