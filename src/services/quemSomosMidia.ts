import { wpFetch } from './wordpress'
import type { WPQuemSomosMidia, WPMediaAttachment, RawWPQuemSomosMidia } from '../types/cms'

async function resolveMedia(id: number): Promise<{ url: string; alt: string } | null> {
  try {
    const m = await wpFetch<WPMediaAttachment>(`/wp-json/wp/v2/media/${id}`)
    return { url: m.source_url, alt: m.alt_text || '' }
  } catch {
    return null
  }
}

export async function fetchQuemSomosMidia(): Promise<WPQuemSomosMidia | null> {
  const raw = await wpFetch<RawWPQuemSomosMidia[]>(
    '/wp-json/wp/v2/quem_somos_midia?status=publish&per_page=1',
  )

  if (!raw.length) return null

  const c = raw[0]
  const { imagem, video_url, poster, ...restAcf } = c.acf

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

  const resolvedPoster =
    typeof poster === 'number' && poster > 0
      ? await resolveMedia(poster)
      : poster
        ? (poster as { url: string; alt: string })
        : null

  return {
    ...c,
    acf: { ...restAcf, imagem: resolvedImagem, video_url: resolvedVideoUrl, poster: resolvedPoster },
  }
}
