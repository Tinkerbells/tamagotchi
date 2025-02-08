import { GET_RESOURCES_QUERY_KEY } from '../resources'
import { UserId } from '../user'
import { UpdateWaterDto, WaterType } from './dto'
import { GET_WATER_QUERY_KEY } from './use-get-water'
import { client } from '@/shared'
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'

type UpdateWaterParams = { userId: UserId } & UpdateWaterDto

const updateWater = async (params: UpdateWaterParams) => {
  try {
    const response = await client.water[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        userId: params.userId,
        currentValue: params.currentValue,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update water: ${response.status} ${response.statusText}`
      )
      error.name = 'UpdateWaterError'
      throw error
    }
    const water = await response.json()
    return water
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdateWater = (
  options?: Omit<
    MutationOptions<WaterType | undefined, Error, UpdateWaterParams, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: UpdateWaterParams) => updateWater(params),
    onSuccess: (data, variables, context) => {
      // queryClient.setQueryData(GET_WATER_QUERY_KEY, () => data)
      queryClient.refetchQueries({ queryKey: GET_WATER_QUERY_KEY })
      queryClient.refetchQueries({ queryKey: GET_RESOURCES_QUERY_KEY })
      toast.success('Успешно обновлено!')
      options?.onSuccess?.(data, variables, context)
    },
  })
}
