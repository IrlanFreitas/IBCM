import { wpFetch } from './wordpress'
import type { WPTimelineEvent } from '../types/cms'

export async function fetchTimeline(): Promise<WPTimelineEvent[]> {
  return wpFetch<WPTimelineEvent[]>(
    '/wp-json/wp/v2/timeline_event'
  )
}
