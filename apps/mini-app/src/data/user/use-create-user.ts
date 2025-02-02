import type { User, CreateUserDto } from './dto'
import { client } from '@/shared'
import { MutationOptions, useMutation } from '@tanstack/react-query'

type CreateUserQueryParams = CreateUserDto

const createUser = async (params: CreateUserQueryParams) => {
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
          `Failed to fetch user: ${userResponse.status} ${userResponse.statusText}`
        )
        error.name = 'FetchUserError'
        throw error
      }
      const user = await userResponse.json()
      return user
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useCreateUser = (
  options?: Omit<
    MutationOptions<User | undefined, Error, CreateUserQueryParams, unknown>,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: (params: CreateUserQueryParams) => createUser(params),
    ...options,
  })
}
