import type { ConvertedStatistics } from '../dto'

export function ConvertResources(fetchedResources: ConvertedStatistics) {
  const { meal } = fetchedResources
  const countMeals = ['breakfast', 'lunch', 'dinner', 'snack'].reduce(
    (count, key) => {
      return meal[key as keyof typeof meal] ? count + 1 : count
    },
    0,
  )
  const result = {
    meal: countMeals,
  }
  return result
}
