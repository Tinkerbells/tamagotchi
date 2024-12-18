import { UserId } from '../user'
import { type Achievements } from './dto'
import { client } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetAchievementsQueryParams = {
  userId: UserId
}

export const GET_ACHIEVEMENTS_QUERY_KEY = ['achievements']

const getAchievements = async (params: GetAchievementsQueryParams) => {
  try {
    const response = await client.achievements[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to fetch achievements: ${response.status} ${response.statusText}`
      )
      error.name = 'FetchAchievementsError'
      throw error
    }
    const achievements = await response.json()
    return achievements
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetAchievements = (
  params: GetAchievementsQueryParams,
  options?: Omit<
    QueryObserverOptions<Achievements, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: GET_ACHIEVEMENTS_QUERY_KEY,
    queryFn: () => getAchievements(params),
    retry: 0,
    ...options,
  })
}
