import { useQuery } from '@tanstack/react-query'
import { fetchOpcoes } from '../services/opcoes'

export function useOpcoes() {
  return useQuery({
    queryKey: ['opcoes'],
    queryFn: fetchOpcoes,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })
}
