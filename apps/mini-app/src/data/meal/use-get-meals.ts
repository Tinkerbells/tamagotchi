import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import type { WeekDayProgressType } from '@/shared'
import type { SelectedMeals } from '@/screens/meals-screen/types'

import { client } from '@/shared'

import type { UserId } from '../user'

import { convertMeals } from './lib'

interface GetMealsQueryParams {
  userId: UserId
}

interface GetMealsQueryType {
  data: WeekDayProgressType[]
  currentMeals: SelectedMeals
}

export const GET_MEALS_QUERY_KEY = ['meals']

async function getMeals(params: GetMealsQueryParams) {
  try {
    const mealsResponse = await client.meals[':id'].$get({
      param: { id: params.userId.toString() },
    })

    if (!mealsResponse.ok) {
      throw new Error(
        `Failed to fetch meals: ${mealsResponse.status} ${mealsResponse.statusText}`,
      )
    }
    const meals = await mealsResponse.json()
    const convertedMeals = convertMeals(meals)
    return convertedMeals
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetMeals(params: GetMealsQueryParams, options?: Omit<
  QueryObserverOptions<GetMealsQueryType, Error>,
    'queryKey' | 'queryFn'
>) {
  return useQuery({
    queryKey: GET_MEALS_QUERY_KEY,
    queryFn: () => getMeals(params),
    retry: 0,
    ...options,
  })
}
