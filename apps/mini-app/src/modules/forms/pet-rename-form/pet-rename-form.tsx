import { useForm } from 'react-hook-form'
import { Button, Input } from '@tamagotchi/ui'

import { useAuth } from '@/shared'
import { useUpdatePet } from '@/data'

interface PetRenameFormData {
  petName: string
}

export function PetRenameForm() {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetRenameFormData>()

  const { mutate: updatePet, isError, isPending } = useUpdatePet()

  const onSubmit = async (data: PetRenameFormData) => {
    updatePet({ petName: data.petName, userId: user.id })
  }

  return (
    <form
      className="font-vk flex h-full w-full flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        isError={!!errors.petName || isError}
        placeholder="Введите имя"
        className="text-center text-2xl"
        {...register('petName', { required: 'Имя питомца обязательно' })}
      />
      <Button
        isLoading={isPending}
        disabled={isPending}
        type="submit"
        className="font-vk mt-4 font-bold"
      >
        Подтвердить
      </Button>
    </form>
  )
}
