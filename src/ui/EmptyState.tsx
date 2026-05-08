import { ShoppingBag } from 'lucide-react'

interface Props {
  title?:    string
  subtitle?: string
}

export function EmptyState({ title = 'לא נמצאו פריטים', subtitle = 'נסה לשנות את הסינון' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center">
        <ShoppingBag className="w-7 h-7 text-ink-400" />
      </div>
      <div>
        <p className="text-ink-900 font-medium text-base">{title}</p>
        <p className="text-ink-400 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  )
}
