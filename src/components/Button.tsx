import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary:
    'bg-book-blue text-white hover:bg-brand-700 shadow-sm shadow-book-blue/20',
  secondary:
    'bg-white/85 text-book-blue border border-blue-200 hover:border-book-blue/40 hover:bg-book-blue-soft',
  ghost: 'bg-transparent text-slate-600 hover:bg-white/70 hover:text-book-blue',
}

const sizes = {
  md: 'px-5 py-2.5 text-base rounded-2xl',
  lg: 'px-6 py-3 text-base rounded-2xl font-semibold sm:px-8 sm:py-4 sm:text-lg sm:rounded-3xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex max-w-full items-center justify-center gap-2 text-center transition-all duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-book-blue/30 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
