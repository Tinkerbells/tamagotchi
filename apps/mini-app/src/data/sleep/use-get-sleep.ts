import { UserId } from '../user'
import { convertSleep } from './lib'
import { client, WeekDayProgressType } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetSleepQueryParams = {
  userId: UserId
}

type GetSleepQueryType = {
  sleepData: WeekDayProgressType[]
  currentValue: number
  dailyNorm: number
}

export const GET_SLEEP_QUERY_KEY = ['sleep']

const getSleep = async (params: GetSleepQueryParams) => {
  try {
    const [sleepResponse, normsResponse] = await Promise.all([
      client.sleep[':id'].$get({
        param: { id: params.userId.toString() },
      }),
      client.norms[':id'].$get({
        param: { id: params.userId.toString() },
      }),
    ])

    if (!sleepResponse.ok) {
      throw new Error(
        `Failed to fetch sleep: ${sleepResponse.status} ${sleepResponse.statusText}`
      )
    }
    if (!normsResponse.ok) {
      throw new Error(
        `Failed to fetch norms: ${sleepResponse.status} ${sleepResponse.statusText}`
      )
    }
    const sleep = await sleepResponse.json()
    const norms = await normsResponse.json()
    return convertSleep(sleep, norms)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetSleep = (
  params: GetSleepQueryParams,
  options?: Omit<
    QueryObserverOptions<GetSleepQueryType, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: GET_SLEEP_QUERY_KEY,
    queryFn: () => getSleep(params),
    retry: 0,
    ...options,
  })
}
