import { UserId } from '../user'
import { convertWater } from './lib'
import { client, WeekDayProgressType } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetWaterQueryParams = {
  userId: UserId
}

type GetWaterQueryType = {
  waterData: WeekDayProgressType[]
  currentValue: number
  dailyNorm: number
}

export const GET_WATER_QUERY_KEY = ['water']

const getWater = async (params: GetWaterQueryParams) => {
  try {
    const [waterResponse, normsResponse] = await Promise.all([
      client.resources.water[':id'].$get({
        param: { id: params.userId.toString() },
      }),
      client.resources.norms[':id'].$get({
        param: { id: params.userId.toString() },
      }),
    ])

    if (!waterResponse.ok) {
      throw new Error(
        `Failed to fetch water: ${waterResponse.status} ${waterResponse.statusText}`
      )
    }
    if (!normsResponse.ok) {
      throw new Error(
        `Failed to fetch norms: ${waterResponse.status} ${waterResponse.statusText}`
      )
    }
    const water = await waterResponse.json()
    const norms = await normsResponse.json()
    return convertWater(water, norms)
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
