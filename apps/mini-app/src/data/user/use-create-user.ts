import type { MutationOptions } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/shared'

import type { CreateUserDto, User } from './dto'

import { GET_USER_QUERY_KEY } from './use-get-user'

type CreateUserQueryParams = CreateUserDto

async function createUser(params: CreateUserQueryParams) {
  try {
    if (params.vkUser) {
      const { country, city, ...vkUserInfo } = params.vkUser
      const userResponse = await client.user.$post({
        json: {
          vkUser: {
            city: JSON.stringify(city),
            country: JSON.stringify(country),
            ...vkUserInfo,
          },
          user: {
            provider: 'vk',
            vkId: vkUserInfo.id,
          },
          petName: params.petName,
        },
      })
      if (!userResponse.ok) {
        const error = new Error(
          `Failed to fetch user: ${userResponse.status} ${userResponse.statusText}`,
        )
        error.name = 'FetchUserError'
        throw error
      }
      const user = await userResponse.json()
      return user
    }
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useCreateUser(options?: Omit<
  MutationOptions<User | undefined, Error, CreateUserQueryParams, unknown>,
  'mutationFn'
>) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: CreateUserQueryParams) => createUser(params),
    retry: 3,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: GET_USER_QUERY_KEY })
      navigate('/')
    },
    ...options,
  })
}
