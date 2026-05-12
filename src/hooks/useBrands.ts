import { useQuery } from '@tanstack/react-query'
import { fetchBrands } from '../service/productsService'

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn:  fetchBrands,
    staleTime: 5 * 60 * 1000,
  })
}
