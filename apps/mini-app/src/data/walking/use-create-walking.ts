import type { MutationOptions } from '@tanstack/react-query'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/shared'

import type { CreateWalkingParams, WalkingType } from './dto'

import { convertWalkingForAPI } from './dto'
import { GET_RESOURCES_QUERY_KEY } from '../resources'
import { GET_WALKINGS_QUERY_KEY } from './use-get-walking'

async function createWalking(params: CreateWalkingParams): Promise<WalkingType> {
  try {
    const apiParams = convertWalkingForAPI(params)

    const response = await client.walking.$post({
      json: { ...apiParams },
    })

    if (!response.ok) {
      const error = new Error(
        `Failed to create walking record: ${response.status} ${response.statusText}`,
      )
      error.name = 'CreateWalkingError'
      throw error
    }

    const walking = await response.json()
    return walking
  }
  catch (error) {
    console.error('Error creating walking record:', error)
    throw error
  }
}

export function useCreateWalking(options?: Omit<
  MutationOptions<WalkingType | undefined, Error, CreateWalkingParams, unknown>,
  'mutationFn'
>) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: CreateWalkingParams) => createWalking(params),
    onSuccess: (data, variables, context) => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: GET_WALKINGS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: GET_RESOURCES_QUERY_KEY })

      // Call any additional onSuccess handlers from options
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error) => {
      console.error('Walking update failed:', error)
      toast.error('Не удалось сохранить данные ходьбы')
    },
  })
}
