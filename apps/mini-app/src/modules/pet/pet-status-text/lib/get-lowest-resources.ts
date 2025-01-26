import { FetchedResources } from '@/data'

const resourceActions: Record<keyof FetchedResources, string> = {
  meal: 'ели',
  water: 'пили',
  meditation: 'медитировали',
  gratitude: 'писали благодарности',
  walking: 'гуляли',
  sleep: 'спали',
}

export const getLowestResources = (resources: FetchedResources): string[] => {
  return Object.entries(resources)
    .sort(([, a], [, b]) => a - b) // Sort entries by value
    .slice(0, 2) // Take the first two entries
    .map(([key]) => resourceActions[key as keyof FetchedResources]) // Map to action strings
}
