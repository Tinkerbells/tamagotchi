import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared'

import type { User } from './dto'

interface GetUserQueryParams {
  userId: string
}

export const GET_USER_QUERY_KEY = ['user']

async function getUser(params: GetUserQueryParams) {
  console.log(`Trying to get user with ${params.userId}`)
  try {
    const response = await client.user[':id'].$get({
      param: { id: params.userId },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`,
      )
      error.name = 'FetchUserError'
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

export function useGetUser(params: GetUserQueryParams, options?: Omit<QueryObserverOptions<User, Error>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: GET_USER_QUERY_KEY,
    queryFn: () => getUser(params),
    refetchInterval: 60000,
    retry: 3,
    ...options,
  })
}
