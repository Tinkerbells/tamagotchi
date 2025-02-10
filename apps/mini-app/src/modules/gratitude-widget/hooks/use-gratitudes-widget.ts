import { useGetGratitudes } from "@/data"
import { useAuth } from "@/shared"

export const useGratitudesWidget = () => {
  const { user } = useAuth()
  const {
    data,
    isLoading
  } = useGetGratitudes({
    userId: user.id,
  })
  return {
    gratitudes: data?.current,
    isLoading
  }
}
