import type { FetchedResources } from '@/data'

import { moodStates } from '@/data'

export function getMood(resources: FetchedResources) {
  const values = Object.values(resources) // Extract all values from the object
  const sum = values.reduce((acc, value) => acc + value, 0)
  const mean = sum / values.length
  if (mean < 25) {
    return moodStates.veryBored // Very bored if below 25
  }
  else if (mean >= 25 && mean < 50) {
    return moodStates.bored // Bored if between 25 and 50
  }
  else if (mean >= 50 && mean < 75) {
    return moodStates.happy // Happy if between 50 and 75
  }
  else {
    return moodStates.veryHappy // Very happy if 75 or above
  }
}
