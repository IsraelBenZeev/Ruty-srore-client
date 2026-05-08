import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface Props {
  children: ReactNode
  variant?: 'ghost' | 'outline' | 'solid'
  className?: string
}

export function Badge({ children, variant = 'ghost', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-sm',
        variant === 'ghost'   && 'bg-ink-100 text-ink-500',
        variant === 'outline' && 'border border-ink-300 text-ink-500',
        variant === 'solid'   && 'bg-ink-900 text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
