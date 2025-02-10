import { UserId } from '../user'
import { ConvertedStatistics } from './dto'
import { convertStatistics } from './lib'
import { client } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetStatisticsQueryParams = {
  userId: UserId
}

export const GET_STATISTICS_QUERY_KEY = ['statistics']

const getStatistics = async (params: GetStatisticsQueryParams) => {
  try {
    const response = await client.resources.statistics[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to statistics: ${response.status} ${response.statusText}`
      )
      error.name = 'FetchStatisticsError'
      throw error
    }
    const result = await response.json()
    return convertStatistics(result)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetStatistics = (
  params: GetStatisticsQueryParams,
  options?: Omit<
    QueryObserverOptions<ConvertedStatistics, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: GET_STATISTICS_QUERY_KEY,
    queryFn: () => getStatistics(params),
    retry: 0,
    ...options,
  })
}
