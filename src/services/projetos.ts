import { wpFetch } from './wordpress'
import type { WPProjeto } from '../types/cms'

export async function fetchProjetos(): Promise<WPProjeto[]> {
  return wpFetch<WPProjeto[]>(
    '/wp-json/wp/v2/projeto'
  )
}
