import { UserId } from '../user'
import { convertGratitudes } from './lib'
import { client, WeekDayProgressType } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetGratitudesQueryParams = {
  userId: UserId
}

type GetGratitudesQueryType = {
  data: WeekDayProgressType[]
}

export const GET_GRATITUDES_QUERY_KEY = ['gratitudes']

const getGratitudes = async (params: GetGratitudesQueryParams) => {
  try {
    const gratitudesResponse = await client.gratitudes[':id'].$get({
      param: { id: params.userId.toString() },
    })

    if (!gratitudesResponse.ok) {
      throw new Error(
        `Failed to fetch gratitudes: ${gratitudesResponse.status} ${gratitudesResponse.statusText}`
      )
    }
    const gratitudes = await gratitudesResponse.json()
    const convertedGratitudes = convertGratitudes(gratitudes)
    return convertedGratitudes
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetGratitudes = (
  params: GetGratitudesQueryParams,
  options?: Omit<
    QueryObserverOptions<GetGratitudesQueryType, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: GET_GRATITUDES_QUERY_KEY,
    queryFn: () => getGratitudes(params),
    retry: 0,
    ...options,
  })
}
