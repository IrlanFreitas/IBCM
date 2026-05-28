import { wpFetch } from './wordpress'
import type { WPCausa } from '../types/cms'

export async function fetchCausas(): Promise<WPCausa[]> {
  return wpFetch<WPCausa[]>(
    '/wp-json/wp/v2/causa?per_page=100&_embed&status=publish',
  )
}
