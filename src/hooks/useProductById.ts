import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../service/productsService'
import { PRODUCTS_KEY } from './useProducts'

export function useProductById(id: string | null) {
  return useQuery({
    queryKey: [PRODUCTS_KEY, 'detail', id],
    queryFn:  () => fetchProductById(id!),
    enabled:  !!id,
  })
}
