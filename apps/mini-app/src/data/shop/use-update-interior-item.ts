import { GET_PET_QUERY_KEY } from '../pet'
import { UserId } from '../user'
import { type Shop } from './dto'
import { GET_SHOP_QUERY_KEY } from './use-get-shop'
import { client } from '@/shared'
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

type UpdateInteriorItemParams = {
  userId: UserId
  itemId: string
}

const updateInteriorItem = async (params: UpdateInteriorItemParams) => {
  try {
    const response = await client.shop.interior[':id'].$patch({
      param: { id: params.itemId },
      json: {
        userId: params.userId,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update interior item: ${response.status} ${response.statusText}`
      )
      error.name = 'UpdateInteriorItemError'
      throw error
    }
    const updatedItem = await response.json()
    return updatedItem
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdateInteriorItem = (
  options?: Omit<
    MutationOptions<Shop | undefined, Error, UpdateInteriorItemParams, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: (params: UpdateInteriorItemParams) =>
      updateInteriorItem(params),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(GET_SHOP_QUERY_KEY, () => data)
      queryClient.refetchQueries({ queryKey: GET_PET_QUERY_KEY })
      options?.onSuccess?.(data, variables, context)
    },
  })
}
