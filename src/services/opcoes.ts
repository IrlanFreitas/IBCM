import { wpFetch } from './wordpress'
import type { WPOpcoes } from '../types/cms'

interface ACFOptionsResponse {
  acf: WPOpcoes
}

export async function fetchOpcoes(): Promise<WPOpcoes> {
  const { acf } = await wpFetch<ACFOptionsResponse>('/wp-json/acf/v3/options/options')
  return acf
}
