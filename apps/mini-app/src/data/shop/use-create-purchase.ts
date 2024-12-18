import { GET_USER_QUERY_KEY, UserId } from '../user'
import { type Shop } from './dto'
import { GET_SHOP_QUERY_KEY } from './use-get-shop'
import { client } from '@/shared'
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

type CreatePurchaseParams = {
  userId: UserId
  itemId: string
  itemType: 'accessory' | 'interior'
}

const createPurchase = async (params: CreatePurchaseParams) => {
  try {
    const response = await client.shop.purchase[':id'].$patch({
      param: { id: params.itemId },
      json: {
        itemType: params.itemType,
        userId: params.userId,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to create purchase: ${response.status} ${response.statusText}`
      )
      error.name = 'CreatePurchaseError'
      throw error
    }
    const purchase = await response.json()
    return purchase
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useCreatePurchase = (
  options?: Omit<
    MutationOptions<Shop | undefined, Error, CreatePurchaseParams, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (params: CreatePurchaseParams) => createPurchase(params),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(GET_SHOP_QUERY_KEY, () => {
        return data
      })
      queryClient.refetchQueries({ queryKey: GET_USER_QUERY_KEY })
      options?.onSuccess?.(data, variables, context)
    },
  })
}
