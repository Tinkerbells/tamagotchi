import { UserId, UserMood } from './dto'
import { isUserMoodEnabled } from './lib'
import { client } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetUserMoodQueryParams = {
  userId: UserId
}

export const GET_USER_MOOD_QUERY_KEY = ['user-mood']

const getUserMood = async (params: GetUserMoodQueryParams) => {
  try {
    const response = await client.user.mood[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to fetch user mood: ${response.status} ${response.statusText}`
      )
      error.name = 'FetchUserMoodError'
      throw error
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetUserMood = (
  params: GetUserMoodQueryParams,
  options?: Omit<QueryObserverOptions<UserMood, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: GET_USER_MOOD_QUERY_KEY,
    queryFn: () => getUserMood(params),
    retry: 0,
    enabled: !isUserMoodEnabled(),
    ...options,
  })
}
