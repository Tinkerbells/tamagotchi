import { UserId } from '../user'
import { Pet } from './dto'
import { GET_PET_QUERY_KEY } from './use-get-pet'
import { client } from '@/shared'
import { useDismissModal } from '@tamagotchi/ui'
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

type CreatePetQueryParams = {
  userId: UserId
  petName: string
}

const updatePet = async (params: CreatePetQueryParams) => {
  try {
    const response = await client.pet[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        name: params.petName,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update pet: ${response.status} ${response.statusText}`
      )
      error.name = 'UpdatePetError'
      throw error
    }
    const updatedPet = await response.json()
    return updatedPet
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdatePet = (
  options?: Omit<
    MutationOptions<Pet, Error, CreatePetQueryParams, unknown>,
    'mutationFn' | 'onSuccess'
  >
) => {
  const { dismiss } = useDismissModal()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: CreatePetQueryParams) => updatePet(params),
    onSuccess: () => {
      dismiss()
      queryClient.invalidateQueries({ queryKey: GET_PET_QUERY_KEY })
    },
    ...options,
  })
}
