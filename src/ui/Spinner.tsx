import { cn } from '../utils/cn'

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="טוען"
      className={cn(
        'inline-block w-5 h-5 border-2 border-ink-200 border-t-ink-900 rounded-full animate-spin',
        className,
      )}
    />
  )
}
