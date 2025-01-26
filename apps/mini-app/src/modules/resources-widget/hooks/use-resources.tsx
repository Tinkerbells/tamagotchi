import { useMoodStore } from '../store'
import { getMood } from '../utils/get-mood'
import { useGetResources } from '@/data'
import { useAuth } from '@/shared'
import { useEffect } from 'react'

export const useResources = () => {
  const { user } = useAuth()
  const { data: resources, isLoading } = useGetResources({ userId: user.id })
  const { setMood } = useMoodStore()

  useEffect(() => {
    if (resources) {
      setMood(getMood(resources))
    }
  }, [resources])

  return {
    resources,
    isLoading,
  }
}
