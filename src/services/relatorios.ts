import { wpFetch } from './wordpress'
import type { WPRelatorio } from '../types/cms'

interface WPMedia {
  source_url: string
  title: { rendered: string }
}

type WPRelatorioRaw = Omit<WPRelatorio, 'acf'> & {
  acf: Omit<WPRelatorio['acf'], 'arquivo_pdf'> & { arquivo_pdf: number | null }
}

async function resolveArquivo(relatorio: WPRelatorioRaw): Promise<WPRelatorio> {
  const arquivoId = relatorio.acf.arquivo_pdf

  if (!arquivoId) {
    return { ...relatorio, acf: { ...relatorio.acf, arquivo_pdf: null } }
  }

  try {
    const media = await wpFetch<WPMedia>(`/wp-json/wp/v2/media/${arquivoId}`)
    return {
      ...relatorio,
      acf: {
        ...relatorio.acf,
        arquivo_pdf: { url: media.source_url, filename: media.title.rendered },
      },
    }
  } catch {
    return { ...relatorio, acf: { ...relatorio.acf, arquivo_pdf: null } }
  }
}

export async function fetchRelatorios(): Promise<WPRelatorio[]> {
  const relatorios = await wpFetch<WPRelatorioRaw[]>(
    '/wp-json/wp/v2/relatorio?per_page=100&status=publish&_embed',
  )
  return Promise.all(relatorios.map(resolveArquivo))
}
