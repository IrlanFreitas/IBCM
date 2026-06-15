import { useQuery } from '@tanstack/react-query'
import { fetchQuemSomosMidia } from '../services/quemSomosMidia'

export function useQuemSomosMidia() {
  return useQuery({
    queryKey: ['quem_somos_midia'],
    queryFn: fetchQuemSomosMidia,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
