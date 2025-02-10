import { GET_RESOURCES_QUERY_KEY } from '../resources'
import { client } from '@/shared'
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { GratitudeId, GratitudeType } from './dto'
import toast from 'react-hot-toast'
import { GET_GRATITUDES_QUERY_KEY } from './use-get-gratitudes'

type RemoveGratitudeParams = { id: GratitudeId }

const removeGratitude = async (params: RemoveGratitudeParams) => {
  try {
    const response = await client.gratitude[':id'].$post({
      param: { id: params.id },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to remove gratitude: ${response.status} ${response.statusText}`
      )
      error.name = 'RemoveGratitudeError'
      throw error
    }
    const gratitude = await response.json()
    return gratitude
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useRemoveGratitude = (
  options?: Omit<
    MutationOptions<GratitudeType | undefined, Error, RemoveGratitudeParams, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: RemoveGratitudeParams) => removeGratitude(params),
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: GET_GRATITUDES_QUERY_KEY })
      queryClient.refetchQueries({ queryKey: GET_RESOURCES_QUERY_KEY })
      options?.onSuccess?.(data, variables, context)
    },
    onError: () => {
      toast.error("Что-то пошло не так!")
    }
  })
}
