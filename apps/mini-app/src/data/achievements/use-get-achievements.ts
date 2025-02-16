import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId } from '../user'
import type { Achievements } from './dto'

interface GetAchievementsQueryParams {
  userId: UserId
}

export const GET_ACHIEVEMENTS_QUERY_KEY = ['achievements']

async function getAchievements(params: GetAchievementsQueryParams) {
  try {
    const response = await client.achievements[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to fetch achievements: ${response.status} ${response.statusText}`,
      )
      error.name = 'FetchAchievementsError'
      throw error
    }
    const achievements = await response.json()
    return achievements
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetAchievements(params: GetAchievementsQueryParams, options?: Omit<
  QueryObserverOptions<Achievements, Error>,
    'queryKey' | 'queryFn'
>) {
  return useQuery({
    queryKey: GET_ACHIEVEMENTS_QUERY_KEY,
    queryFn: () => getAchievements(params),
    retry: 0,
    ...options,
  })
}
