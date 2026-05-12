export type Season = 'winter' | 'summer' | 'all-year'
export type Gender = 'גברים' | 'נשים' | 'ילדים' | 'נערים' | 'כללי'

export interface ProductImage {
  id:                  string
  product_id:          string
  cloudinary_url:      string
  cloudinary_public_id: string | null
  original_filename:   string | null
  sort_order:          number
  is_primary:          boolean
  created_at:          string
}

export interface Product {
  id:                string
  name:              string
  description:       string | null
  price:             number | null
  season:            Season
  gender:            Gender
  size:              string[] | null
  color:             string | null
  brand:             string | null
  in_stock:          boolean
  delivery_time:     string | null
  allow_returns:     boolean | null
  sms_required:      boolean | null
  contact_info:      string | null
  source_message:    string | null
  created_at:        string
  purchase_url:      string | null
  product_code:      string | null
  facebook_url:      string | null
  telegram_url:      string | null
  message_timestamp: string | null
  images:            ProductImage[]
}

export interface ProductFilters {
  season?:   Season | 'all'
  gender?:   Gender | 'all'
  brand?:    string
  search?:   string
  in_stock?: boolean
}

export type SortKey = 'created_at' | 'price' | 'name'

export const SEASON_LABELS: Record<Season | 'all', string> = {
  all:        'הכל',
  winter:     'חורף',
  summer:     'קיץ',
  'all-year': 'כל עונה',
}

export const GENDER_LABELS: Record<Gender | 'all', string> = {
  all:     'הכל',
  'גברים': 'גברים',
  'נשים':  'נשים',
  'ילדים': 'ילדים',
  'נערים': 'נערים',
  'כללי':  'כללי',
}
