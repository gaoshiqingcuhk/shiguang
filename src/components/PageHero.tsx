import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description: string
  children?: ReactNode
  visual?: ReactNode
}

export function PageHero({ eyebrow, title, description, children, visual }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/75 px-4 py-8 shadow-[0_18px_50px_rgba(38,52,69,0.08)] sm:rounded-[2rem] sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full bg-sun-yellow/25 blur-3xl" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {eyebrow && (
            <p className="text-sm font-semibold tracking-wide text-book-blue">{eyebrow}</p>
          )}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-loose text-slate-600 sm:text-lg">
            {description}
          </p>
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>}
        </div>
        {visual && <div className="relative">{visual}</div>}
      </div>
    </section>
  )
}
