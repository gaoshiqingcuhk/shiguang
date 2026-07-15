import { Card } from './Card'

interface ChecklistCardProps {
  title: string
  items: string[]
  variant?: 'default' | 'soft' | 'highlight' | 'warning' | 'success' | 'danger'
}

export function ChecklistCard({ title, items, variant = 'default' }: ChecklistCardProps) {
  return (
    <Card variant={variant} className="h-full">
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-green/15 text-xs font-bold text-leaf-green">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
