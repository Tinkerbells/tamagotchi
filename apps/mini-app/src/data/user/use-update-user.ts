import type { MutationOptions } from '@tanstack/react-query'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/shared'

import type { User, UserId } from './dto'

import { GET_USER_QUERY_KEY } from './use-get-user'

interface UpdateUserQueryParams {
  userId: UserId
  gems: number
}

async function updateUser(params: UpdateUserQueryParams) {
  try {
    const response = await client.user[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        gems: params.gems,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update user: ${response.status} ${response.statusText}`,
      )
      error.name = 'UpdateUserError'
      throw error
    }
    const user = await response.json()
    return user
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useUpdateUser(options?: Omit<
  MutationOptions<User | undefined, Error, UpdateUserQueryParams, unknown>,
  'mutationFn'
>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: UpdateUserQueryParams) => updateUser(params),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GET_USER_QUERY_KEY })
      options?.onSuccess?.(data, variables, context)
    },
  })
}
