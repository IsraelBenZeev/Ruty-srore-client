import { Search, X } from 'lucide-react'
import { cn } from '../utils/cn'

interface Props {
  value:       string
  onChange:    (v: string) => void
  placeholder?: string
  className?:  string
}

export function SearchInput({ value, onChange, placeholder = 'חיפוש...', className }: Props) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        dir="rtl"
        className="w-full pr-9 pl-9 py-2.5 bg-ink-50 border border-ink-200 rounded-sm text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
