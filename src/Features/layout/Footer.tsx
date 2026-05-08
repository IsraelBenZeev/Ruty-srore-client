export function Footer() {
  return (
    <footer className="border-t border-ink-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-2xl font-bold tracking-[0.2em] text-ink-200 uppercase select-none">
            Ruty
          </span>
          <p className="text-xs text-ink-400 tracking-wide">
            © {new Date().getFullYear()} כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  )
}
