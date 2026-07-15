interface ProgressBarProps {
  current: number
  total: number
  label?: string
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between text-sm text-slate-500">
          <span>{label}</span>
          <span>
            {current} / {total}
          </span>
        </div>
      )}
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/70 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
