export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="aspect-[3/4] bg-ink-100 rounded-sm" />
      <div className="flex flex-col gap-2 px-1">
        <div className="h-3 bg-ink-100 rounded w-2/3" />
        <div className="h-3 bg-ink-100 rounded w-1/2" />
        <div className="h-3 bg-ink-100 rounded w-1/4 mt-1" />
      </div>
    </div>
  )
}
