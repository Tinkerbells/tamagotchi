import * as React from "react"
import { GratitudeType, useCreateGratitude, useGetGratitudes } from '@/data'
import { useAuth, WeekDayProgressType } from '@/shared'

export const useGratitude = () => {
  const { user } = useAuth()


  const title = 'Благодарность'
  const description =
    'Фиксируйте свои мысли – за что вы благодарны себе / окружающим / миру каждый день, принятие - первый шаг к балансу.'


  const { mutate: createGratitudeMutation, isPending: isGratitudeCreating } =
    useCreateGratitude()

  const createGratitude = (message: string) => {
    createGratitudeMutation({ userId: user.id, message: message })
  }

  const {
    data,
    isLoading: isGratitudeLoading,
    isSuccess
  } = useGetGratitudes({
    userId: user.id,
  })

  const [currentGratitudes, setCurrentGratitudes] = React.useState<GratitudeType[]>([])


  React.useEffect(() => {
    if (data?.current) {
      if (isSuccess) {
        setCurrentGratitudes(data.current)
        return
      }
    }
  }, [data, isSuccess])

  const isLoading = isGratitudeLoading

  return {
    data: data?.data,
    isLoading,
    title,
    description,
    createGratitude,
    isGratitudeCreating,
    currentGratitudes
  }
}
