import { wpFetch } from './wordpress'
import type { WPProjeto } from '../types/cms'

export async function fetchProjetos(): Promise<WPProjeto[]> {
  return wpFetch<WPProjeto[]>(
    '/wp-json/wp/v2/projeto?per_page=100&_embed&status=publish',
  )
}
