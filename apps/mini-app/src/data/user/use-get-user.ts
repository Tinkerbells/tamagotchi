import { User } from './dto'
import { client } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetUserQueryParams = {
  userId: string
}

export const GET_USER_QUERY_KEY = ['user']

const getUser = async (params: GetUserQueryParams) => {
  console.log(`Trying to get user with ${params.userId}`)
  try {
    const response = await client.user[':id'].$get({
      param: { id: params.userId },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      )
      error.name = 'FetchUserError'
      throw error
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetUser = (
  params: GetUserQueryParams,
  options?: Omit<QueryObserverOptions<User, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: GET_USER_QUERY_KEY,
    queryFn: () => getUser(params),
    refetchInterval: 6000,
    retry: 0,
    ...options,
  })
}
