import { UserId } from '../user'
import { FetchedResources } from './dto'
import { client } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetResourcesQueryParams = {
  userId: UserId
}

export const GET_RESOURCES_QUERY_KEY = ['resources']

const getResources = async (params: GetResourcesQueryParams) => {
  try {
    const response = await client.resources[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to resources: ${response.status} ${response.statusText}`
      )
      error.name = 'FetchResourcesError'
      throw error
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetResources = (
  params: GetResourcesQueryParams,
  options?: Omit<QueryObserverOptions<FetchedResources, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: GET_RESOURCES_QUERY_KEY,
    queryFn: () => getResources(params),
    retry: 0,
    ...options,
  })
}
