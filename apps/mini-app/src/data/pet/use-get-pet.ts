import type { QueryObserverOptions } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared'

import type { PetDto } from './dto'
import type { UserId } from '../user'

interface GetPetQueryParams {
  userId: UserId
}

export const GET_PET_QUERY_KEY = ['pet']

async function getPet(params: GetPetQueryParams) {
  try {
    const petResponse = await client.pet[':id'].$get({
      param: { id: params.userId.toString() },
    })
    if (!petResponse.ok) {
      const error = new Error(
        `Failed to fetch pet: ${petResponse.status} ${petResponse.statusText}`,
      )
      error.name = 'FetchPetError'
      throw error
    }
    const pet = await petResponse.json()
    return pet
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

export function useGetPet(params: GetPetQueryParams, options?: Omit<QueryObserverOptions<PetDto, Error>, 'queryKey' | 'queryFn'>) {
  return useQuery({
    queryKey: GET_PET_QUERY_KEY,
    queryFn: () => getPet(params),
    retry: 0,
    ...options,
  })
}
