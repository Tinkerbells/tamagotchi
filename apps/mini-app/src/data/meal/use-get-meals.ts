import { UserId } from '../user'
import { convertMeals } from './lib'
import { SelectedMeals } from '@/screens/meals-screen/types'
import { client, WeekDayProgressType } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetMealsQueryParams = {
  userId: UserId
}

type GetMealsQueryType = {
  data: WeekDayProgressType[]
  currentMeals: SelectedMeals
}

export const GET_MEALS_QUERY_KEY = ['meals']

const getMeals = async (params: GetMealsQueryParams) => {
  try {
    const mealsResponse = await client.meals[':id'].$get({
      param: { id: params.userId.toString() },
    })

    if (!mealsResponse.ok) {
      throw new Error(
        `Failed to fetch meals: ${mealsResponse.status} ${mealsResponse.statusText}`
      )
    }
    const meals = await mealsResponse.json()
    const convertedMeals = convertMeals(meals)
    return convertedMeals
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetMeals = (
  params: GetMealsQueryParams,
  options?: Omit<
    QueryObserverOptions<GetMealsQueryType, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: GET_MEALS_QUERY_KEY,
    queryFn: () => getMeals(params),
    retry: 0,
    ...options,
  })
}
