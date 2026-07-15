import type { ReactNode } from 'react'

interface BoundaryBoxProps {
  title: string
  children: ReactNode
  tone?: 'info' | 'warning' | 'danger' | 'success'
}

const tones = {
  info: 'border-blue-200 bg-blue-50/80 text-blue-950',
  warning: 'border-amber-200 bg-amber-50/90 text-amber-950',
  danger: 'border-rose-200 bg-rose-50/85 text-rose-950',
  success: 'border-emerald-200 bg-emerald-50/85 text-emerald-950',
}

export function BoundaryBox({ title, children, tone = 'info' }: BoundaryBoxProps) {
  return (
    <div className={`rounded-2xl border px-5 py-4 ${tones[tone]}`}>
      <p className="font-bold">{title}</p>
      <div className="mt-2 text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  )
}
