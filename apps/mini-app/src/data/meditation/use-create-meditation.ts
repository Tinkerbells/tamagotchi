import type {
  MutationOptions,
} from '@tanstack/react-query'

import toast from 'react-hot-toast'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { client, useConfetti } from '@/shared'

import type { UserId } from '../user'
import type { MeditationType } from './dto'

import { GET_RESOURCES_QUERY_KEY } from '../resources'

interface CreateMeditationParams { userId: UserId }

async function createMeditation(params: CreateMeditationParams) {
  try {
    const response = await client.meditation.$post({
      json: {
        userId: params.userId,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to create meditation: ${response.status} ${response.statusText}`,
      )
      error.name = 'CreateMeditationError'
      throw error
    }
    const meditation = await response.json()
    return meditation
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useCreateMeditation(options?: Omit<
  MutationOptions<
      MeditationType | undefined,
    Error,
    CreateMeditationParams,
    unknown
  >,
  'mutationFn'
>) {
  const queryClient = useQueryClient()
  const confetti = useConfetti()

  return useMutation({
    ...options,
    mutationFn: (params: CreateMeditationParams) => createMeditation(params),
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: GET_RESOURCES_QUERY_KEY })
      confetti()
      options?.onSuccess?.(data, variables, context)
    },
    onError: () => {
      toast.error('Что-то пошло не так!')
    },
  })
}
