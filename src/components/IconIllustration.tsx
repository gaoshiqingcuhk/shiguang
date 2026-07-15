type IconType = 'book' | 'timer' | 'sound' | 'report' | 'privacy' | 'support'

interface IconIllustrationProps {
  type: IconType
  className?: string
}

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconIllustration({ type, className = '' }: IconIllustrationProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={`h-12 w-12 text-book-blue ${className}`}
    >
      {type === 'book' && (
        <>
          <path {...common} d="M9 12.5c5.8-.8 10.2.2 15 3.2v22.8c-4.8-3-9.2-4-15-3.2V12.5Z" />
          <path {...common} d="M39 12.5c-5.8-.8-10.2.2-15 3.2v22.8c4.8-3 9.2-4 15-3.2V12.5Z" />
          <path {...common} d="M15 19h4M15 25h4M29 19h4M29 25h4" />
        </>
      )}
      {type === 'timer' && (
        <>
          <circle {...common} cx="24" cy="26" r="14" />
          <path {...common} d="M19 8h10M24 12v4M24 26l6-5M15 14l-3-3M33 14l3-3" />
        </>
      )}
      {type === 'sound' && (
        <>
          <path {...common} d="M10 28h7l10 8V12l-10 8h-7v8Z" />
          <path {...common} d="M32 19c2.4 2.8 2.4 7.2 0 10M37 15c4.8 5.2 4.8 12.8 0 18" />
        </>
      )}
      {type === 'report' && (
        <>
          <path {...common} d="M15 8h14l6 6v26H15V8Z" />
          <path {...common} d="M29 8v7h6M20 22h10M20 28h12M20 34h7" />
        </>
      )}
      {type === 'privacy' && (
        <>
          <path {...common} d="M24 7 38 13v10c0 9-5.8 15.6-14 18-8.2-2.4-14-9-14-18V13l14-6Z" />
          <path {...common} d="M19 24h10v9H19v-9ZM21 24v-3a3 3 0 0 1 6 0v3" />
        </>
      )}
      {type === 'support' && (
        <>
          <path {...common} d="M14 30c3-5 7-7 10-7s7 2 10 7" />
          <circle {...common} cx="24" cy="16" r="6" />
          <path {...common} d="M9 36c4.5 3 9.5 4.5 15 4.5S34.5 39 39 36M12 25l-4-4M36 25l4-4" />
        </>
      )}
    </svg>
  )
}
