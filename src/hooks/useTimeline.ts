import { useQuery } from '@tanstack/react-query'
import { fetchTimeline } from '../services/timeline'

export function useTimeline() {
  return useQuery({
    queryKey: ['timeline'],
    queryFn: fetchTimeline,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })
}
