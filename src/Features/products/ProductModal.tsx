import { useEffect, useState } from 'react'
import { X, MessageCircle, Tag, Snowflake, Sun, Calendar, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '../../ui/Badge'
import { Spinner } from '../../ui/Spinner'
import { useProductById } from '../../hooks/useProductById'
import { SEASON_LABELS } from '../../types/product'

interface Props {
  productId: string | null
  onClose:   () => void
}

export function ProductModal({ productId, onClose }: Props) {
  const { data: product, isLoading } = useProductById(productId)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => { setImgIndex(0) }, [productId])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!productId) return null

  const images = product?.images ?? []
  const currentImage = images[imgIndex]?.cloudinary_url

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div
        className="relative z-10 w-full sm:max-w-xl bg-white animate-slide-up sm:rounded-sm max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-ink-100 hover:bg-ink-200 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-ink-700" />
        </button>

        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        )}

        {product && (
          <>
            {/* Image */}
            <div className="relative aspect-[4/3] bg-ink-50 overflow-hidden">
              {currentImage ? (
                <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Tag className="w-12 h-12 text-ink-300" />
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex(i => Math.max(0, i - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setImgIndex(i => Math.min(images.length - 1, i + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIndex ? 'bg-ink-900' : 'bg-white/70'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4" dir="rtl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {product.brand && (
                    <p className="text-xs font-semibold tracking-widest uppercase text-ink-400 mb-1">
                      {product.brand}
                    </p>
                  )}
                  <h2 className="text-xl font-semibold text-ink-900 leading-snug">
                    {product.name}
                  </h2>
                  {product.product_code && (
                    <p className="text-xs text-ink-400 mt-0.5">קוד: {product.product_code}</p>
                  )}
                </div>
                {product.price != null && (
                  <span className="text-2xl font-bold text-ink-900 tabular-nums flex-shrink-0">
                    ₪{product.price.toLocaleString('he-IL')}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-sm text-ink-600 leading-relaxed">{product.description}</p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="ghost">{product.gender}</Badge>
                <Badge variant="ghost">
                  {product.season === 'winter' && <Snowflake className="w-3 h-3 ml-1" />}
                  {product.season === 'summer' && <Sun className="w-3 h-3 ml-1" />}
                  {SEASON_LABELS[product.season]}
                </Badge>
                {product.size  && <Badge variant="outline">{product.size}</Badge>}
                {product.color && <Badge variant="outline">{product.color}</Badge>}
                {!product.in_stock && <Badge variant="solid">אזל מהמלאי</Badge>}
              </div>

              {/* Source message */}
              {product.source_message && (
                <div className="bg-ink-50 rounded-sm p-3 border-r-2 border-ink-300">
                  <p className="text-xs text-ink-500 font-medium mb-1">מהודעת הווצאפ</p>
                  <p className="text-xs text-ink-600 leading-relaxed whitespace-pre-line">
                    {product.source_message}
                  </p>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-ink-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(product.created_at).toLocaleDateString('he-IL')}</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2 mt-2">
                {product.purchase_url && (
                  <a
                    href={product.purchase_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-ink-900 text-white text-sm font-medium tracking-wide hover:bg-ink-700 transition-colors rounded-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>לרכישה</span>
                  </a>
                )}
                {product.contact_info && (
                  <a
                    href={`https://wa.me/${product.contact_info.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-ink-900 text-ink-900 text-sm font-medium tracking-wide hover:bg-ink-50 transition-colors rounded-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>צור קשר בוואצאפ</span>
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
