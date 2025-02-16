import type {
  MutationOptions,
} from '@tanstack/react-query'

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { client } from '@/shared'

import type { Shop } from './dto'
import type { UserId } from '../user'

import { GET_PET_QUERY_KEY } from '../pet'
import { GET_SHOP_QUERY_KEY } from './use-get-shop'

interface UpdateInteriorItemParams {
  userId: UserId
  itemId: string
}

async function updateInteriorItem(params: UpdateInteriorItemParams) {
  try {
    const response = await client.shop.interior[':id'].$patch({
      param: { id: params.itemId },
      json: {
        userId: params.userId,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update interior item: ${response.status} ${response.statusText}`,
      )
      error.name = 'UpdateInteriorItemError'
      throw error
    }
    const updatedItem = await response.json()
    return updatedItem
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useUpdateInteriorItem(options?: Omit<
  MutationOptions<Shop | undefined, Error, UpdateInteriorItemParams, unknown>,
  'mutationFn'
>) {
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
