import { Button } from '@tamagotchi/ui'
import { Controller, useForm } from 'react-hook-form'

import { useAuth } from '@/shared'
import { useCreateUserMood } from '@/data'

import { MoodButton } from './mood-button'

interface MoodFormValues {
  moodStatus: number
}

export function SelectMoodForm() {
  const { user } = useAuth()
  const { mutate: createUserMood, isPending } = useCreateUserMood()
  const { control, handleSubmit, setValue } = useForm<MoodFormValues>({
    defaultValues: { moodStatus: 0 },
  })

  const onSubmit = (data: MoodFormValues) => {
    createUserMood({ userId: user.id, moodStatus: data.moodStatus })
  }

  const handleMoodSelect = (value: number) => {
    setValue('moodStatus', value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-vk">
      <div className="flex justify-between">
        <Controller
          name="moodStatus"
          control={control}
          render={() => (
            <>
              {[1, 2, 3, 4, 5].map((mood, index) => (
                <MoodButton key={mood} onClick={() => handleMoodSelect(mood)}>
                  {['😭', '😢', '😐', '🙂', '😄'][index]}
                </MoodButton>
              ))}
            </>
          )}
        />
      </div>
      <Button
        className="mt-4 w-full"
        type="submit"
        isLoading={isPending}
        disabled={isPending}
      >
        Подтвердить
      </Button>
    </form>
  )
}
