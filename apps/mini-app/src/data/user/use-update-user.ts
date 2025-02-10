import type { User, UserId } from './dto'
import { client } from '@/shared'
import { MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { GET_USER_QUERY_KEY } from './use-get-user'

type UpdateUserQueryParams = {
  userId: UserId
  gems: number
}

const updateUser = async (params: UpdateUserQueryParams) => {
  try {
    const response = await client.user[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        gems: params.gems
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update user: ${response.status} ${response.statusText}`
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

export const useUpdateUser = (
  options?: Omit<
    MutationOptions<User | undefined, Error, UpdateUserQueryParams, unknown>,
    'mutationFn'
  >
) => {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: UpdateUserQueryParams) => updateUser(params),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: GET_USER_QUERY_KEY })
      options?.onSuccess?.(data, variables, context)
    },
  })
}
