import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { CardProduct } from './CardProduct'
import { Filters } from './Filters'
import { ProductModal } from './ProductModal'
import { SkeletonCard } from '../../ui/SkeletonCard'
import { EmptyState } from '../../ui/EmptyState'
import type { ProductFilters, SortKey } from '../../types/product'
import { cn } from '../../utils/cn'

export function ProductsScreen() {
  const [filters,          setFilters]          = useState<ProductFilters>({})
  const [sortKey,          setSortKey]          = useState<SortKey>('created_at')
  const [sortAsc,          setSortAsc]          = useState(false)
  const [selectedId,       setSelectedId]       = useState<string | null>(null)
  const [sidebarOpen,      setSidebarOpen]      = useState(false)

  const { data: products = [], isLoading, isError } = useProducts(filters, sortKey, sortAsc)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink-900 tracking-tight">
            קולקציה
          </h1>
          <p className="text-sm text-ink-400 mt-1">
            {isLoading ? '...' : `${products.length} פריטים`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={`${sortKey}:${sortAsc}`}
            onChange={e => {
              const [k, a] = e.target.value.split(':')
              setSortKey(k as SortKey)
              setSortAsc(a === 'true')
            }}
            className="text-xs border border-ink-200 rounded-sm px-2.5 py-2 text-ink-700 bg-white focus:outline-none focus:border-ink-900 transition-colors"
          >
            <option value="created_at:false">חדש ביותר</option>
            <option value="created_at:true">ישן ביותר</option>
            <option value="price:true">מחיר: נמוך לגבוה</option>
            <option value="price:false">מחיר: גבוה לנמוך</option>
            <option value="name:true">שם: א-ת</option>
          </select>

          {/* Filters toggle (mobile) */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className={cn(
              'flex items-center gap-2 text-xs px-3 py-2 border rounded-sm transition-colors',
              sidebarOpen
                ? 'bg-ink-900 border-ink-900 text-white'
                : 'border-ink-200 text-ink-700 hover:border-ink-400',
            )}
          >
            {sidebarOpen ? <X className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">סינון</span>
          </button>
        </div>
      </div>

      <div className="flex gap-8">

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-56 flex-shrink-0 animate-slide-up">
            <Filters filters={filters} onChange={setFilters} />
          </aside>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {isError && (
            <div className="text-center py-16 text-ink-500 text-sm">
              שגיאה בטעינת המוצרים — נסה שוב מאוחר יותר
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <EmptyState />
          )}

          {!isLoading && !isError && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 animate-fade-in">
              {products.map(p => (
                <CardProduct
                  key={p.id}
                  product={p}
                  onClick={() => setSelectedId(p.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        productId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  )
}
