import { wpFetch } from './wordpress'
import type { WPNoticia } from '../types/cms'
import type { Noticia } from '../app/data/noticias'

function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function htmlToParagraphs(html: string): string[] {
  return html
    .split(/<\/p>/)
    .map((p) => htmlToText(p))
    .filter((p) => p.length > 0)
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function mapWPNoticia(wp: WPNoticia): Noticia {
  const media = wp._embedded?.['wp:featuredmedia']?.[0]
  return {
    id: wp.id,
    slug: wp.slug,
    data: formatDate(wp.date),
    titulo: htmlToText(wp.title.rendered),
    imagem: media?.source_url ?? '',
    lead: htmlToText(wp.excerpt.rendered),
    corpo: htmlToParagraphs(wp.content.rendered),
  }
}

export async function fetchNoticias(): Promise<WPNoticia[]> {
  return wpFetch<WPNoticia[]>(
    '/wp-json/wp/v2/posts?per_page=100&_embed&status=publish&orderby=date&order=desc',
  )
}

export async function fetchNoticiaPorSlug(slug: string): Promise<WPNoticia | null> {
  const results = await wpFetch<WPNoticia[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed&status=publish`,
  )
  return results[0] ?? null
}
