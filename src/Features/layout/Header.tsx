import { ShoppingBag } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-ink-900 rounded-sm flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-[0.15em] text-ink-900 uppercase select-none">
              Ruty
            </span>
          </div>

          {/* Tagline */}
          <p className="hidden sm:block text-xs text-ink-400 tracking-widest uppercase">
            קניות בגדים פרמיום
          </p>
        </div>
      </div>
    </header>
  )
}
