import { wpFetch } from './wordpress'
import type { WPDepoimento } from '../types/cms'

export async function fetchDepoimentos(): Promise<WPDepoimento[]> {
  return wpFetch<WPDepoimento[]>(
    '/wp-json/wp/v2/depoimento?per_page=100&status=publish',
  )
}
