import { type Shop } from './dto'
import { client } from '@/shared'
import { QueryObserverOptions, useQuery } from '@tanstack/react-query'

type GetShopQueryParams = {
  userId: string
}

export const GET_SHOP_QUERY_KEY = ['shop']

const getShop = async (params: GetShopQueryParams) => {
  try {
    const response = await client.shop[':id'].$get({
      param: { id: params.userId },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to fetch shop: ${response.status} ${response.statusText}`
      )
      error.name = 'FetchShopError'
      throw error
    }
    const shop = await response.json()
    return shop
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetShop = (
  params: GetShopQueryParams,
  options?: Omit<QueryObserverOptions<Shop, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: GET_SHOP_QUERY_KEY,
    queryFn: () => getShop(params),
    retry: 0,
    ...options,
  })
}
