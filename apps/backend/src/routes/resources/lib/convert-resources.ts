import { selectNormsSchema, selectResourcesSchema } from '@/hc'
import { z } from 'zod'

export const convertResources = (
  resources: z.infer<typeof selectResourcesSchema>,
  norms: z.infer<typeof selectNormsSchema>
) => {
  const { meal, water, sleep, meditation, gratitude, walking } = resources

  const mealValue = meal
    ? (Number(meal.breakfast ?? false) +
        Number(meal.lunch ?? false) +
        Number(meal.dinner ?? false) +
        Number(meal.snack ?? false) +
        Number(meal.afternoon_snack ?? false)) *
      20
    : 0
  const waterValue =
    ((water?.currentValue ?? 0) / (norms.waterDailyNorm ?? 1)) * 100 // Default to 0 if `water` or `norms.waterDailyNorm` is missing.
  const sleepValue =
    ((sleep?.currentValue ?? 0) / (norms.sleepDailyNorm ?? 1)) * 100 // Default to 0 if `sleep` or `norms.sleepDailyNorm` is missing.
  const meditationValue = meditation ? 100 : 0 // Check if `meditation` exists and is finished.
  const gratitudeValue = (gratitude?.length ?? 0) > 0 ? 100 : 0
  const walkingValue = walking?.finished ? 100 : 0 // Check if `walking` exists and is finished.
  return {
    meal: mealValue,
    water: waterValue,
    meditation: meditationValue,
    gratitude: gratitudeValue,
    walking: walkingValue,
    sleep: sleepValue,
  }
}
