import { wpFetch } from './wordpress'
import type { WPOpcoes } from '../types/cms'

export async function fetchOpcoes(): Promise<WPOpcoes> {
  // Usa uma página WordPress com slug 'ibcm-config' e campos ACF
  const pages = await wpFetch<Array<{ acf: WPOpcoes }>>(
    '/wp-json/wp/v2/pages?slug=ibcm-config',
  )
  const acf = pages[0]?.acf
  if (!acf) throw new Error('Página ibcm-config não encontrada no WordPress')
  return acf
}
