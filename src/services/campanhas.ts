import { wpFetch } from './wordpress'
import type { WPCampanha, WPMediaAttachment, RawWPCampanha } from '../types/cms'

async function resolveMedia(id: number): Promise<{ url: string; alt: string } | null> {
  try {
    const m = await wpFetch<WPMediaAttachment>(`/wp-json/wp/v2/media/${id}`)
    return { url: m.source_url, alt: m.alt_text || '' }
  } catch {
    return null
  }
}

export async function fetchCampanhas(): Promise<WPCampanha[]> {
  const raw = await wpFetch<RawWPCampanha[]>(
    '/wp-json/wp/v2/campanha?status=publish&per_page=3&order=asc',
  )

  return Promise.all(
    raw.map(async (c): Promise<WPCampanha> => {
      const { imagem, video_url, ...restAcf } = c.acf

      const resolvedImagem =
        typeof imagem === 'number' && imagem > 0
          ? await resolveMedia(imagem)
          : imagem
            ? (imagem as { url: string; alt: string })
            : null

      const resolvedVideoUrl =
        typeof video_url === 'number' && video_url > 0
          ? ((await resolveMedia(video_url))?.url ?? '')
          : typeof video_url === 'string'
            ? video_url
            : ''

      return {
        ...c,
        acf: { ...restAcf, imagem: resolvedImagem, video_url: resolvedVideoUrl },
      }
    }),
  )
}
