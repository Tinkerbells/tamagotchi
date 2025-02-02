import { UserId } from '../user'
import { convertWater } from './lib'
import { client, WeekDayProgressType } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetWaterQueryParams = {
  userId: UserId
}

type GetWaterQueryType = {
  waterData: WeekDayProgressType[]
  currentValue: number | null
  dailyNorm: number | null
}

export const GET_WATER_QUERY_KEY = ['water']

const getWater = async (params: GetWaterQueryParams) => {
  try {
    const response = await client.resources.water[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to water: ${response.status} ${response.statusText}`
      )
      error.name = 'FetchWaterError'
      throw error
    }
    const data = await response.json()
    const convertedData = convertWater(data)
    return convertedData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetWater = (
  params: GetWaterQueryParams,
  options?: Omit<
    QueryObserverOptions<GetWaterQueryType, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: GET_WATER_QUERY_KEY,
    queryFn: () => getWater(params),
    retry: 0,
    ...options,
  })
}
