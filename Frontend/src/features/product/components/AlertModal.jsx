import { useTheme } from "../hook/useTheme"

function AlertModal({ message, onClose }) {
  const theme = useTheme()

  if (!message) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: theme.t4_35 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
        style={{ boxShadow: `0 8px 40px ${theme.t4_18}` }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-4" style={{ background: theme.t1_30 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.t3} strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p className="text-[14px] font-medium leading-relaxed mb-5" style={{ color: theme.t4 }}>
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full h-[38px] rounded-[10px] text-[13px] font-semibold text-white border-none cursor-pointer transition-colors"
          style={{ background: theme.t4 }}
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default AlertModal