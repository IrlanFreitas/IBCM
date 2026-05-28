import { useQuery } from '@tanstack/react-query'
import { fetchCausas } from '../services/causas'

export function useCausas() {
  return useQuery({
    queryKey: ['causas'],
    queryFn: fetchCausas,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
