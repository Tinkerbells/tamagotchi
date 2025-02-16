import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId } from '../user'
import type { ConvertedStatistics } from './dto'

import { convertStatistics } from './lib'

interface GetStatisticsQueryParams {
  userId: UserId
}

export const GET_STATISTICS_QUERY_KEY = ['statistics']

async function getStatistics(params: GetStatisticsQueryParams) {
  try {
    const response = await client.resources.statistics[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to statistics: ${response.status} ${response.statusText}`,
      )
      error.name = 'FetchStatisticsError'
      throw error
    }
    const result = await response.json()
    return convertStatistics(result)
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetStatistics(params: GetStatisticsQueryParams, options?: Omit<
  QueryObserverOptions<ConvertedStatistics, Error>,
    'queryKey' | 'queryFn'
>) {
  return useQuery({
    queryKey: GET_STATISTICS_QUERY_KEY,
    queryFn: () => getStatistics(params),
    retry: 0,
    ...options,
  })
}
