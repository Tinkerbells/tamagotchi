import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import type { WeekDayProgressType } from '@/shared'

import { client } from '@/shared'

import type { UserId } from '../user'
import type { GratitudeType } from './dto'

import { convertGratitudes } from './lib'

interface GetGratitudesQueryParams {
  userId: UserId
}

interface GetGratitudesQueryType {
  data: WeekDayProgressType[]
  current: GratitudeType[]
}

export const GET_GRATITUDES_QUERY_KEY = ['gratitudes']

async function getGratitudes(params: GetGratitudesQueryParams) {
  try {
    const gratitudesResponse = await client.gratitudes[':id'].$get({
      param: { id: params.userId.toString() },
    })

    if (!gratitudesResponse.ok) {
      throw new Error(
        `Failed to fetch gratitudes: ${gratitudesResponse.status} ${gratitudesResponse.statusText}`,
      )
    }
    const gratitudes = await gratitudesResponse.json()
    const convertedGratitudes = convertGratitudes(gratitudes)
    return convertedGratitudes
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetGratitudes(params: GetGratitudesQueryParams, options?: Omit<
  QueryObserverOptions<GetGratitudesQueryType, Error>,
    'queryKey' | 'queryFn'
>) {
  return useQuery({
    queryKey: GET_GRATITUDES_QUERY_KEY,
    queryFn: () => getGratitudes(params),
    retry: 0,
    ...options,
  })
}
