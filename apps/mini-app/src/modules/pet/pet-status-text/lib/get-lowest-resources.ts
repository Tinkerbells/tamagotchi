import type { FetchedResources } from '@/data'

const resourceActions: Record<keyof FetchedResources, string> = {
  meal: 'принимали пищу',
  water: 'пили воду',
  meditation: 'медитировали',
  gratitude: 'писали благодарности',
  walking: 'гуляли',
  sleep: 'спали',
}

export function getLowestResources(resources: FetchedResources): string[] {
  return Object.entries(resources)
    .sort(([, a], [, b]) => a - b) // Sort entries by value
    .slice(0, 2) // Take the first two entries
    .map(([key]) => resourceActions[key as keyof FetchedResources]) // Map to action strings
}
