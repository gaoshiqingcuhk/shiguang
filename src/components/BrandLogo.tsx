interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <span
      aria-label="识光｜儿童中文阅读支持"
      role="img"
      className={`block h-12 w-[220px] max-w-[calc(100vw-5.5rem)] bg-[url('/brand-logo-sheet.png')] bg-no-repeat sm:h-14 sm:w-[260px] ${className}`}
      style={{
        backgroundSize: '767.5px 512px',
        backgroundPosition: '-510px -38px',
      }}
    />
  )
}
