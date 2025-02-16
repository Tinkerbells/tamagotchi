import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId, UserMood } from './dto'

import { isUserMoodEnabled } from './lib'

interface GetUserMoodQueryParams {
  userId: UserId
}

export const GET_USER_MOOD_QUERY_KEY = ['user-mood']

async function getUserMood(params: GetUserMoodQueryParams) {
  try {
    const response = await client.user.mood[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to fetch user mood: ${response.status} ${response.statusText}`,
      )
      error.name = 'FetchUserMoodError'
      throw error
    }
    const result = await response.json()
    return result
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetUserMood(params: GetUserMoodQueryParams, options?: Omit<QueryObserverOptions<UserMood, Error>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: GET_USER_MOOD_QUERY_KEY,
    queryFn: () => getUserMood(params),
    retry: false, // Disable retry
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnMount: false, // Disable refetch on mount
    refetchInterval: false, // Disable refetch interval
    retryOnMount: false, // Disable retry on mount
    retryDelay: 0,
    enabled: !isUserMoodEnabled(),
    ...options,
  })
}
