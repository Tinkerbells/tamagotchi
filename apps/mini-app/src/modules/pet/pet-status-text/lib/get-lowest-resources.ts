import type { FetchedResources } from '@/data'

const resourceActions: Record<keyof FetchedResources, string> = {
  meal: 'принимали пищу',
  water: 'пили воду',
  meditation: 'медитировали',
  gratitude: 'писали благодарности',
  walking: 'гуляли',
  sleep: 'спали',
}

export function getLowestResources(resources: FetchedResources): Array<{ key: keyof FetchedResources, action: string }> {
  return Object.entries(resources)
    .sort(([, a], [, b]) => a - b) // Sort entries by value
    .slice(0, 2) // Take the first two entries
    .map(([key]) => ({
      key: key as keyof FetchedResources,
      action: resourceActions[key as keyof FetchedResources],
    }))
}
