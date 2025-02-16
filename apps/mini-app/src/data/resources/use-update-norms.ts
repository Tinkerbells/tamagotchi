import type {
  MutationOptions,
} from '@tanstack/react-query'

import toast from 'react-hot-toast'
import { useDismissModal } from '@tamagotchi/ui'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { client } from '@/shared'

import type { UserId } from '../user'
import type { FetchedNorms, UpdateNormsDto } from './dto'

import { GET_SLEEP_QUERY_KEY } from '../sleep'
import { GET_WATER_QUERY_KEY } from '../water'

type UpdateNormsParams = { userId: UserId } & UpdateNormsDto

async function updateNorms(params: UpdateNormsParams) {
  try {
    const response = await client.norms[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        waterDailyNorm: params.waterDailyNorm,
        sleepDailyNorm: params.sleepDailyNorm,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update norms: ${response.status} ${response.statusText}`,
      )
      error.name = 'UpdateNormsError'
      throw error
    }
    const norms = await response.json()
    return norms
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useUpdateNorms(options?: Omit<
  MutationOptions<
      FetchedNorms | undefined,
    Error,
    UpdateNormsParams,
    unknown
  >,
  'mutationFn'
>) {
  const queryClient = useQueryClient()

  const { dismiss } = useDismissModal()
  return useMutation({
    ...options,
    mutationFn: (params: UpdateNormsParams) => updateNorms(params),
    onError: () => {
      toast.error('Что-то пошло не так, повторите запрос')
    },
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: GET_WATER_QUERY_KEY })
      queryClient.refetchQueries({ queryKey: GET_SLEEP_QUERY_KEY })
      dismiss()
      toast.success('Успешно обновлено!')
      options?.onSuccess?.(data, variables, context)
    },
  })
}
