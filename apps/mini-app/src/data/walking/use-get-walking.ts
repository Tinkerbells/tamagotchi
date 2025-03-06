import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId } from '../user'
import type { FetchedWalkings, WalkingProgressType } from './dto'

import { parseWalkings } from './lib'

interface GetWalkingsQueryParams {
  userId: UserId
}

export const GET_WALKINGS_QUERY_KEY = ['walkings']

async function getWalkings(params: GetWalkingsQueryParams): Promise<WalkingProgressType[]> {
  try {
    const response = await client.walkings[':id'].$get({
      param: { id: params.userId.toString() },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch walking data: ${response.status} ${response.statusText}`,
      )
    }

    const walkings: FetchedWalkings = await response.json()
    return parseWalkings(walkings)
  }
  catch (error) {
    console.error('Error fetching walking data:', error)
    throw error
  }
}

export function useGetWalkings(
  params: GetWalkingsQueryParams,
  options?: Omit<
    QueryObserverOptions<WalkingProgressType[], Error>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: GET_WALKINGS_QUERY_KEY,
    queryFn: () => getWalkings(params),
    retry: 1,
    ...options,
  })
}
