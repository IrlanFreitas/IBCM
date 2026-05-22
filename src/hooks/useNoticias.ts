import { useQuery } from '@tanstack/react-query'
import { fetchNoticias, fetchNoticiaPorSlug, mapWPNoticia } from '../services/noticias'

export function useNoticias() {
  return useQuery({
    queryKey: ['noticias'],
    queryFn: async () => {
      const wpNoticias = await fetchNoticias()
      return wpNoticias.map(mapWPNoticia)
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useNoticia(slug: string) {
  return useQuery({
    queryKey: ['noticia', slug],
    queryFn: async () => {
      const wp = await fetchNoticiaPorSlug(slug)
      return wp ? mapWPNoticia(wp) : null
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: Boolean(slug),
  })
}
