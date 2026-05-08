import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../service/productsService'
import type { ProductFilters, SortKey } from '../types/product'

export const PRODUCTS_KEY = 'products'

export function useProducts(
  filters: ProductFilters = {},
  sortKey: SortKey = 'created_at',
  sortAsc = false,
) {
  return useQuery({
    queryKey: [PRODUCTS_KEY, filters, sortKey, sortAsc],
    queryFn:  () => fetchProducts(filters, sortKey, sortAsc),
  })
}
