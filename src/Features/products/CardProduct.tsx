import { useState } from 'react'
import { MessageCircle, Tag, Snowflake, Sun, ShoppingBag } from 'lucide-react'
import { Badge } from '../../ui/Badge'
import type { Product } from '../../types/product'

interface Props {
  product:  Product
  onClick?: () => void
}

export function CardProduct({ product, onClick }: Props) {
  const [imgError, setImgError] = useState(false)
  const imageUrl = product.images?.[0]?.cloudinary_url

  return (
    <article
      onClick={onClick}
      className="group flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-ink-50 overflow-hidden rounded-sm">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tag className="w-8 h-8 text-ink-300" />
          </div>
        )}

        {/* Season icon */}
        <div className="absolute top-2 left-2">
          {product.season === 'winter' && (
            <div className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
              <Snowflake className="w-3.5 h-3.5 text-ink-600" />
            </div>
          )}
          {product.season === 'summer' && (
            <div className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
              <Sun className="w-3.5 h-3.5 text-ink-600" />
            </div>
          )}
        </div>

        {/* Out of stock overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-semibold tracking-widest text-ink-500 uppercase bg-white px-3 py-1 border border-ink-200">
              אזל
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 pt-3 px-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {product.brand && (
              <p className="text-[10px] font-semibold tracking-widest uppercase text-ink-400 mb-0.5">
                {product.brand}
              </p>
            )}
            <h3 className="text-sm font-medium text-ink-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </div>

          {product.price != null && (
            <span className="flex-shrink-0 text-sm font-semibold text-ink-900 tabular-nums">
              ₪{product.price.toLocaleString('he-IL')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="ghost">{product.gender}</Badge>
          {product.size && <Badge variant="outline">{product.size}</Badge>}
          {product.color && (
            <span className="text-[10px] text-ink-400">{product.color}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {product.purchase_url && (
            <a
              href={product.purchase_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[11px] text-ink-500 hover:text-ink-900 transition-colors mt-0.5"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>לרכישה</span>
            </a>
          )}
          {product.contact_info && (
            <a
              href={`https://wa.me/${product.contact_info.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[11px] text-ink-500 hover:text-ink-900 transition-colors mt-0.5"
            >
              <MessageCircle className="w-3 h-3" />
              <span>צור קשר</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
