import { cn } from '../../utils/cn'
import { SearchInput } from '../../ui/SearchInput'
import type { ProductFilters, Season, Gender } from '../../types/product'
import { SEASON_LABELS, GENDER_LABELS } from '../../types/product'

interface Props {
  filters:   ProductFilters
  onChange:  (f: ProductFilters) => void
}

const seasons: Array<Season | 'all'> = ['all', 'summer', 'winter', 'all-year']
const genders: Array<Gender | 'all'> = ['all', 'נשים', 'גברים', 'ילדים', 'נערים', 'כללי']

export function Filters({ filters, onChange }: Props) {
  const set = <K extends keyof ProductFilters>(key: K, val: ProductFilters[K]) =>
    onChange({ ...filters, [key]: val })

  return (
    <div className="flex flex-col gap-5" dir="rtl">

      {/* Search */}
      <SearchInput
        value={filters.search ?? ''}
        onChange={v => set('search', v)}
        placeholder="חפש בגד, מותג..."
      />

      {/* Season */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-400">עונה</span>
        <div className="flex flex-wrap gap-2">
          {seasons.map(s => (
            <button
              key={s}
              onClick={() => set('season', s)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium border rounded-sm transition-all',
                filters.season === s || (!filters.season && s === 'all')
                  ? 'bg-ink-900 border-ink-900 text-white'
                  : 'border-ink-200 text-ink-600 hover:border-ink-400',
              )}
            >
              {SEASON_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-ink-400">קהל יעד</span>
        <div className="flex flex-wrap gap-2">
          {genders.map(g => (
            <button
              key={g}
              onClick={() => set('gender', g)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium border rounded-sm transition-all',
                filters.gender === g || (!filters.gender && g === 'all')
                  ? 'bg-ink-900 border-ink-900 text-white'
                  : 'border-ink-200 text-ink-600 hover:border-ink-400',
              )}
            >
              {GENDER_LABELS[g]}
            </button>
          ))}
        </div>
      </div>

      {/* In stock */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none" dir="rtl">
        <div
          onClick={() => set('in_stock', filters.in_stock ? undefined : true)}
          className={cn(
            'w-9 h-5 rounded-full transition-colors relative flex-shrink-0',
            filters.in_stock ? 'bg-ink-900' : 'bg-ink-200',
          )}
        >
          <div
            className={cn(
              'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
              filters.in_stock ? 'translate-x-1' : 'translate-x-4',
            )}
          />
        </div>
        <span className="text-sm text-ink-700">במלאי בלבד</span>
      </label>

    </div>
  )
}
