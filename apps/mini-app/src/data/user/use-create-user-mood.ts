import type { UserId, UserMood } from './dto'
import { client } from '@/shared'
import { MutationOptions, useMutation } from '@tanstack/react-query'

type CreateUserMoodParams = {
  userId: UserId
  moodStatus: number
}

const createUserMood = async (params: CreateUserMoodParams) => {
  try {
    const response = await client.user.mood[':id'].$post({
      param: { id: params.userId.toString() },
      json: {
        moodStatus: params.moodStatus,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to create user mood: ${response.status} ${response.statusText}`
      )
      error.name = 'CreateUserMoodError'
      throw error
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useCreateUserMood = (
  options?: Omit<
    MutationOptions<UserMood | undefined, Error, CreateUserMoodParams, unknown>,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: (params: CreateUserMoodParams) => createUserMood(params),
    onSuccess: ({ createdAt }) => {
      localStorage.setItem('mood_created', JSON.stringify(createdAt)) // set created date to not sent many requests
    },
    ...options,
  })
}
