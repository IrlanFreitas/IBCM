import { useQuery } from '@tanstack/react-query'
import { fetchRelatorios } from '../services/relatorios'

export function useRelatorios() {
  return useQuery({
    queryKey: ['relatorios'],
    queryFn: fetchRelatorios,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })
}
