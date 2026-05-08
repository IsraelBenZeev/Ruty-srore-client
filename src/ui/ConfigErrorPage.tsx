export function ConfigErrorPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-ink-950 flex items-center justify-center px-6"
    >
      <div className="animate-fade-in max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border border-ink-700 flex items-center justify-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                className="text-red-500"
              >
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Subtle red glow */}
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-5 blur-xl scale-150" />
          </div>
        </div>

        {/* Divider line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-ink-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <div className="flex-1 h-px bg-ink-800" />
        </div>

        {/* Text */}
        <p className="text-xs font-medium tracking-widest text-red-500 uppercase mb-3">
          שגיאת מערכת
        </p>
        <h1 className="text-2xl font-light text-white mb-3 leading-snug">
          ארעה שגיאה
        </h1>
        <p className="text-ink-400 text-sm font-light leading-relaxed">
          נא נסה שוב מאוחר יותר
        </p>

        {/* Bottom divider */}
        <div className="flex items-center gap-4 mt-10">
          <div className="flex-1 h-px bg-ink-800" />
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-ink-700" />
            <span className="w-1 h-1 rounded-full bg-ink-700" />
            <span className="w-1 h-1 rounded-full bg-ink-700" />
          </div>
          <div className="flex-1 h-px bg-ink-800" />
        </div>

      </div>
    </div>
  )
}
