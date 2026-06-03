import { useQuery } from '@tanstack/react-query'
import { fetchCampanhas } from '../services/campanhas'

export function useCampanhas() {
  return useQuery({
    queryKey: ['campanha'],
    queryFn: fetchCampanhas,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
