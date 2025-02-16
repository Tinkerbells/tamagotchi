import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId } from '../user'
import type { FetchedResources } from './dto'

interface GetResourcesQueryParams {
  userId: UserId
}

export const GET_RESOURCES_QUERY_KEY = ['resources']

async function getResources(params: GetResourcesQueryParams) {
  try {
    const response = await client.resources[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to resources: ${response.status} ${response.statusText}`,
      )
      error.name = 'FetchResourcesError'
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

export function useGetResources(params: GetResourcesQueryParams, options?: Omit<
  QueryObserverOptions<FetchedResources, Error>,
    'queryKey' | 'queryFn'
>) {
  return useQuery({
    queryKey: GET_RESOURCES_QUERY_KEY,
    queryFn: () => getResources(params),
    retry: 0,
    ...options,
  })
}
