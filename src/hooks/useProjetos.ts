import { useQuery } from '@tanstack/react-query'
import { fetchProjetos } from '../services/projetos'

export function useProjetos() {
  return useQuery({
    queryKey: ['projetos'],
    queryFn: fetchProjetos,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
