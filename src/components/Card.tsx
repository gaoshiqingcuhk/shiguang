import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'soft' | 'highlight' | 'warning' | 'success' | 'danger'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children: ReactNode
}

const variants: Record<CardVariant, string> = {
  default: 'border-slate-200/80 bg-white/90',
  soft: 'border-blue-100 bg-blue-50/55',
  highlight: 'border-yellow-200 bg-yellow-50/80',
  warning: 'border-orange-200 bg-orange-50/85',
  success: 'border-emerald-200 bg-emerald-50/80',
  danger: 'border-rose-200 bg-rose-50/80',
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-[0_14px_40px_rgba(38,52,69,0.07)] sm:rounded-3xl sm:p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
