import type {
  MutationOptions,
} from '@tanstack/react-query'

import { useDismissModal } from '@tamagotchi/ui'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { client } from '@/shared'

import type { Pet } from './dto'
import type { UserId } from '../user'

import { GET_PET_QUERY_KEY } from './use-get-pet'

interface CreatePetQueryParams {
  userId: UserId
  petName: string
}

async function updatePet(params: CreatePetQueryParams) {
  try {
    const response = await client.pet[':id'].$patch({
      param: { id: params.userId.toString() },
      json: {
        name: params.petName,
      },
    })
    if (!response.ok) {
      const error = new Error(
        `Failed to update pet: ${response.status} ${response.statusText}`,
      )
      error.name = 'UpdatePetError'
      throw error
    }
    const updatedPet = await response.json()
    return updatedPet
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useUpdatePet(options?: Omit<
  MutationOptions<Pet, Error, CreatePetQueryParams, unknown>,
    'mutationFn' | 'onSuccess'
>) {
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
