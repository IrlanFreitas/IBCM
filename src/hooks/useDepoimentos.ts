import { useQuery } from '@tanstack/react-query'
import { fetchDepoimentos } from '../services/depoimentos'

export function useDepoimentos() {
  return useQuery({
    queryKey: ['depoimentos'],
    queryFn: fetchDepoimentos,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
