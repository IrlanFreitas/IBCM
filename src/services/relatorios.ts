import { wpFetch } from './wordpress'
import type { WPRelatorio } from '../types/cms'

export async function fetchRelatorios(): Promise<WPRelatorio[]> {
  return wpFetch<WPRelatorio[]>(
    '/wp-json/wp/v2/relatorio'
  )
}
