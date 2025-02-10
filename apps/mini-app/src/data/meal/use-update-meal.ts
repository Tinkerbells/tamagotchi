import { GET_RESOURCES_QUERY_KEY } from '../resources'
import { UserId } from '../user'
import { MealType, UpdateMeal } from './dto'
import { GET_MEALS_QUERY_KEY } from './use-get-meals'
import { client } from '@/shared'
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'

type UpdateMealParams = { userId: UserId } & UpdateMeal

const updateMeal = async (params: UpdateMealParams) => {
  const { dinner, breakfast, lunch, snack, afternoon_snack } = params

  try {
    const response = await client.meal[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        userId: params.userId,
        dinner,
        breakfast,
        afternoon_snack,
        lunch,
        snack,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update meal: ${response.status} ${response.statusText}`
      )
      error.name = 'UpdateMealError'
      throw error
    }
    const meal = await response.json()
    return meal
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdateMeal = (
  options?: Omit<
    MutationOptions<MealType | undefined, Error, UpdateMealParams, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: (params: UpdateMealParams) => updateMeal(params),
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: GET_MEALS_QUERY_KEY })
      queryClient.refetchQueries({ queryKey: GET_RESOURCES_QUERY_KEY })
      toast.success('Успешно обновлено!')
      options?.onSuccess?.(data, variables, context)
    },
  })
}
