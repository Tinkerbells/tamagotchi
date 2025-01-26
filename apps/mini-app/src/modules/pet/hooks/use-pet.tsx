import { useGetPet, useGetUserMood } from '@/data'
import { useResources } from '@/modules/resources-widget'
import { useMoodStore } from '@/modules/resources-widget/store'
import { useAuth } from '@/shared'

export const usePet = () => {
  const { user } = useAuth()

  const { data: petData, isLoading: isPetLoading } = useGetPet({
    userId: user.id,
  })

  const { data: userMood, isLoading: isUserMoodLoading } = useGetUserMood({
    userId: user.id,
  })

  const { resources, isLoading: isResourcesLoading } = useResources()

  const { mood: petMood } = useMoodStore()

  return {
    petData,
    isPetLoading,
    userMood,
    isUserMoodLoading,
    petMood,
    resources,
    isResourcesLoading,
  }
}
