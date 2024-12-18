import { selectNormsSchema, selectResourcesSchema } from '@/hc'
import { z } from 'zod'

export const convertResources = (
  resources: z.infer<typeof selectResourcesSchema>,
  norms: z.infer<typeof selectNormsSchema>
) => {
  const { meal, water, sleep, meditation, gratitude, walking } = resources
  const mealValue =
    ['breakfast', 'lunch', 'dinner', 'snack'].reduce((count, key) => {
      return meal[key as keyof typeof meal] ? count + 1 : count
    }, 0) / 4
  const waterValue = water.currentValue / norms.waterDailyNorm
  const sleepValue = sleep.currentValue / norms.sleepDailyNorm
  const meditationValue = !!meditation && meditation.finished ? 1 : 0
  const gratitudeValue = gratitude.length / 4
  const walkingValue = !!walking && walking.finished ? 1 : 0
  return {
    meal: mealValue,
    water: waterValue,
    meditation: meditationValue,
    gratitude: gratitudeValue,
    walking: walkingValue,
    sleep: sleepValue,
  }
}
