import { useAuth } from '@/shared'
import { useGetGratitudes } from '@/data'

export function useGratitudesWidget() {
  const { user } = useAuth()
  const {
    data,
    isLoading,
  } = useGetGratitudes({
    userId: user.id,
  })
  return {
    gratitudes: data?.current,
    isLoading,
  }
}
