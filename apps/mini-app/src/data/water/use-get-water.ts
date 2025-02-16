import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import type { WeekDayProgressType } from '@/shared'

import { client } from '@/shared'

import type { UserId } from '../user'

import { convertWater } from './lib'

interface GetWaterQueryParams {
  userId: UserId
}

interface GetWaterQueryType {
  waterData: WeekDayProgressType[]
  currentValue: number
  dailyNorm: number
}

export const GET_WATER_QUERY_KEY = ['water']

async function getWater(params: GetWaterQueryParams) {
  try {
    const [waterResponse, normsResponse] = await Promise.all([
      client.water[':id'].$get({
        param: { id: params.userId.toString() },
      }),
      client.norms[':id'].$get({
        param: { id: params.userId.toString() },
      }),
    ])

    if (!waterResponse.ok) {
      throw new Error(
        `Failed to fetch water: ${waterResponse.status} ${waterResponse.statusText}`,
      )
    }
    if (!normsResponse.ok) {
      throw new Error(
        `Failed to fetch norms: ${waterResponse.status} ${waterResponse.statusText}`,
      )
    }
    const water = await waterResponse.json()
    const norms = await normsResponse.json()
    return convertWater(water, norms)
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetWater(params: GetWaterQueryParams, options?: Omit<
  QueryObserverOptions<GetWaterQueryType, Error>,
    'queryKey' | 'queryFn'
>) {
  return useQuery({
    queryKey: GET_WATER_QUERY_KEY,
    queryFn: () => getWater(params),
    retry: 0,
    ...options,
  })
}
