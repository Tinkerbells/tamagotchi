import type {
  MutationOptions,
} from '@tanstack/react-query'

import toast from 'react-hot-toast'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId } from '../user'
import type { GratitudeType } from './dto'

import { GET_RESOURCES_QUERY_KEY } from '../resources'
import { GET_GRATITUDES_QUERY_KEY } from './use-get-gratitudes'

interface CreateGratitudeParams { userId: UserId, message: string }

async function createGratitude(params: CreateGratitudeParams) {
  try {
    const response = await client.gratitude.$post({
      json: {
        userId: params.userId,
        message: params.message,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to create gratitude: ${response.status} ${response.statusText}`,
      )
      error.name = 'CreateGratitudeError'
      throw error
    }
    const gratitude = await response.json()
    return gratitude
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useCreateGratitude(options?: Omit<
  MutationOptions<GratitudeType | undefined, Error, CreateGratitudeParams, unknown>,
  'mutationFn'
>) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: CreateGratitudeParams) => createGratitude(params),
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: GET_GRATITUDES_QUERY_KEY })
      queryClient.refetchQueries({ queryKey: GET_RESOURCES_QUERY_KEY })
      options?.onSuccess?.(data, variables, context)
    },
    onError: () => {
      toast.error('Что-то пошло не так!')
    },
  })
}
