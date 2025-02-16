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
import type { SleepType, UpdateSleepDto } from './dto'

import { GET_SLEEP_QUERY_KEY } from './use-get-sleep'
import { GET_RESOURCES_QUERY_KEY } from '../resources'

type UpdateSleepParams = { userId: UserId } & UpdateSleepDto

async function updateSleep(params: UpdateSleepParams) {
  try {
    const response = await client.sleep[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        userId: params.userId,
        currentValue: params.currentValue,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update sleep: ${response.status} ${response.statusText}`,
      )
      error.name = 'UpdateSleepError'
      throw error
    }
    const sleep = await response.json()
    return sleep
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useUpdateSleep(options?: Omit<
  MutationOptions<SleepType | undefined, Error, UpdateSleepParams, unknown>,
  'mutationFn'
>) {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: UpdateSleepParams) => updateSleep(params),
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: GET_SLEEP_QUERY_KEY })
      queryClient.refetchQueries({ queryKey: GET_RESOURCES_QUERY_KEY })
      toast.success('Успешно обновлено!')
      options?.onSuccess?.(data, variables, context)
    },
  })
}
