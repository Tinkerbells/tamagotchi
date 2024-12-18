import { GET_PET_QUERY_KEY } from '../pet'
import { UserId } from '../user'
import { type Shop } from './dto'
import { GET_SHOP_QUERY_KEY } from './use-get-shop'
import { client } from '@/shared'
import { useDismissModal } from '@tamagotchi/ui'
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

type UpdateAccessoryParams = {
  userId: UserId
  itemId: string
}

const updateAccessory = async (params: UpdateAccessoryParams) => {
  try {
    const response = await client.shop.accessory[':id'].$patch({
      param: { id: params.itemId },
      json: {
        userId: params.userId,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update accessory: ${response.status} ${response.statusText}`
      )
      error.name = 'UpdateAccessoryError'
      throw error
    }
    const purchase = await response.json()
    return purchase
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdateAccessory = (
  options?: Omit<
    MutationOptions<Shop | undefined, Error, UpdateAccessoryParams, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: UpdateAccessoryParams) => updateAccessory(params),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(GET_SHOP_QUERY_KEY, () => data)
      queryClient.refetchQueries({ queryKey: GET_PET_QUERY_KEY })
      options?.onSuccess?.(data, variables, context)
    },
  })
}
