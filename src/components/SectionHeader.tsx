interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-wide text-book-blue">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {description}
        </p>
      )}
    </div>
  )
}
