import type {
  MutationOptions,
} from '@tanstack/react-query'

import { useDismissModal } from '@tamagotchi/ui'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId, UserMood } from './dto'

import { GET_USER_MOOD_QUERY_KEY } from './use-get-user-mood'

interface CreateUserMoodParams {
  userId: UserId
  moodStatus: number
}

async function createUserMood(params: CreateUserMoodParams) {
  try {
    const response = await client.user.mood[':id'].$post({
      param: { id: params.userId.toString() },
      json: {
        moodStatus: params.moodStatus,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to create user mood: ${response.status} ${response.statusText}`,
      )
      error.name = 'CreateUserMoodError'
      throw error
    }
    const result = await response.json()
    return result
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useCreateUserMood(options?: Omit<
  MutationOptions<UserMood | undefined, Error, CreateUserMoodParams, unknown>,
  'mutationFn'
>) {
  const { dismiss } = useDismissModal()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: CreateUserMoodParams) => createUserMood(params),
    onSuccess: ({ createdAt }) => {
      localStorage.setItem('mood_created', JSON.stringify(createdAt)) // set created date to not sent many requests
      queryClient.refetchQueries({ queryKey: GET_USER_MOOD_QUERY_KEY })
      dismiss()
    },
    ...options,
  })
}
