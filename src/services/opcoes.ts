import { wpFetch } from './wordpress'
import type { WPOpcoes } from '../types/cms'

export async function fetchOpcoes(): Promise<WPOpcoes> {
  return wpFetch<WPOpcoes>('/wp-json/ibcm/v1/opcoes')
}
