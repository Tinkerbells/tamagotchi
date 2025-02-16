import { useForm } from 'react-hook-form'
import { Button, Input } from '@tamagotchi/ui'

import { useCreateUser } from '@/data'
import { Image, useNavigate, vkBridge } from '@/shared'

import head from '/images/pet-creation/head.webp'

interface UserCreateFormData {
  petName: string
}

export function UserCreateForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateFormData>()

  const { mutate: createPet, isError } = useCreateUser({
    onSuccess: () => {
      navigate('/')
    },
  })

  const onSubmit = async (data: UserCreateFormData) => {
    const vkUser = await vkBridge.send('VKWebAppGetUserInfo')
    createPet({ petName: data.petName, vkUser })
  }

  return (
    <form
      className="font-vk z-[999] flex h-full flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        placeholder="blur"
        className="object-contain"
        src={head}
        width={161}
        height={90}
      />
      <div className="flex flex-col gap-3 rounded-3xl bg-white px-4 py-8">
        <h2 className="text-center">Придумайте имя питомца</h2>
        <p className="text-gray text-center text-lg">
          Остался последний шажок перед началом вашего совместного приключения!
        </p>
        <Input
          isError={!!errors.petName || isError}
          placeholder="Введите имя"
          className="text-center text-2xl"
          {...register('petName', { required: 'Имя питомца обязательно' })}
        />
      </div>
      <Button
        type="submit"
        className="font-vk absolute bottom-8 w-[calc(100%-3rem)] font-bold"
      >
        Подтвердить
      </Button>
    </form>
  )
}
