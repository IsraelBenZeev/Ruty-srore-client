import type { Product, ProductFilters, SortKey } from '../types/product'

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8000'

export async function fetchProducts(
  filters: ProductFilters = {},
  sortKey: SortKey = 'created_at',
  sortAsc = false,
): Promise<Product[]> {
  const params = new URLSearchParams()

  if (filters.season && filters.season !== 'all') {
    params.set('season', filters.season)
  }
  if (filters.gender && filters.gender !== 'all') {
    params.set('gender', filters.gender)
  }
  if (filters.in_stock) {
    params.set('in_stock', 'true')
  }
  if (filters.search?.trim()) {
    params.set('search', filters.search.trim())
  }
  if (sortKey !== 'created_at') {
    params.set('sort_by', sortKey)
    params.set('sort_asc', String(sortAsc))
  }

  const res = await fetch(`${BASE_URL}/products/?${params}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<Product[]>
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<Product>
}
