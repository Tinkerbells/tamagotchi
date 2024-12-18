import { FetchedResources } from '../dto'

export const ConvertResources = (fetchedResources: FetchedResources) => {
  const { meal } = fetchedResources
  const countMeals = ['breakfast', 'lunch', 'dinner', 'snack'].reduce(
    (count, key) => {
      return meal[key as keyof typeof meal] ? count + 1 : count
    },
    0
  )
  const result = {
    meal: countMeals,
  }
  return result
}
