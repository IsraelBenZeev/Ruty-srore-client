const POLICY_RE = /זמן קבלת המשלוח|אין אפשרות החזרה|אין אפשרות החלפה|חובה להזמין עם מספר/
const URL_RE    = /^https?:\/\//
const BRAND_RE  = /^מותג מוסתר/
// e.g. "NANCY A1336" or "nancy A2483"
const CODE_RE   = /^[A-Za-z]{2,}\s+[A-Za-z][0-9]{3,}$/i

function skip(line: string) {
  return URL_RE.test(line) || BRAND_RE.test(line) || CODE_RE.test(line.trim())
}

function Introline({ text }: { text: string }) {
  // Highlight key: value pairs like "מידות: S-XXL" and "מחיר: 92 ש״ח" inline
  const parts = text.split(/(?=(?:מידות|מחיר מבצע|מחיר|גודל|צבע|גוון):)/)
  if (parts.length > 1) {
    return (
      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
        {parts.map((part, i) => {
          const m = part.match(/^(מידות|מחיר מבצע|מחיר|גודל|צבע|גוון):\s*(.+)/)
          if (m) {
            return (
              <span key={i} className="text-sm">
                <span className="font-semibold text-ink-800">{m[1]}:</span>{' '}
                <span className="text-ink-600">{m[2].trim()}</span>
              </span>
            )
          }
          return part.trim() ? (
            <span key={i} className="text-sm text-ink-600">{part.trim()}</span>
          ) : null
        })}
      </div>
    )
  }
  return <p className="text-sm text-ink-600 leading-relaxed">{text}</p>
}

interface Props {
  text: string
}

export function FormattedDescription({ text }: Props) {
  const lines = text.split('\n').map(l => l.trim())

  type Block =
    | { kind: 'intro';   text: string }
    | { kind: 'bullets'; items: string[] }
    | { kind: 'note';    text: string }

  const blocks: Block[] = []
  let bullets: string[] = []
  let passedFirstStar = false

  const flushBullets = () => {
    if (bullets.length > 0) {
      blocks.push({ kind: 'bullets', items: [...bullets] })
      bullets = []
    }
  }

  for (const line of lines) {
    if (!line || skip(line)) continue

    if (line.startsWith('*')) {
      passedFirstStar = true
      const content = line.slice(1).trim()
      if (content && !POLICY_RE.test(content)) bullets.push(content)
    } else if (/❣️/.test(line)) {
      flushBullets()
      const clean = line.replace(/❣️/g, '').trim()
      if (clean) blocks.push({ kind: 'note', text: clean })
    } else {
      flushBullets()
      if (!passedFirstStar) blocks.push({ kind: 'intro', text: line })
    }
  }
  flushBullets()

  if (blocks.length === 0) return null

  return (
    <div className="flex flex-col gap-3" dir="rtl">
      {blocks.map((block, i) => {
        if (block.kind === 'intro') {
          return <Introline key={i} text={block.text} />
        }

        if (block.kind === 'bullets') {
          return (
            <ul key={i} className="flex flex-col gap-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2 text-xs text-ink-500 leading-relaxed">
                  <span className="mt-0.5 text-ink-300 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }

        // note
        return (
          <div key={i} className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5 text-xs text-amber-800 leading-relaxed">
            {block.text}
          </div>
        )
      })}
    </div>
  )
}
