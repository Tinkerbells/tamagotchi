import { Screen } from '../screen'
import head from '/images/pet-creation/head.webp'
import { Image } from '@/shared'
import { Button, Input } from '@tamagotchi/ui'
import { Popover } from '@vkontakte/vkui'

export const PetCreationScreen = () => {
  return (
    <Screen>
      <form className="font-vk z-[999] flex h-full flex-col items-center justify-center">
        <Image
          placeholder="blur"
          className="object-contain"
          src={head}
          width={161}
          height={90}
        />
        <Popover>
          <div className="flex flex-col gap-3 rounded-3xl bg-white px-4 py-8">
            <h2 className="text-center">Придумайте имя питомца</h2>
            <p className="text-gray text-center text-lg">
              Остался последний шажок перед началом вашего совместного
              приключения!
            </p>
            <Input placeholder="Введите имя" className="text-center text-2xl" />
          </div>
        </Popover>
        <Button className="font-vk absolute bottom-8 w-[calc(100%-3rem)] font-bold">
          Подтвердить
        </Button>
      </form>
    </Screen>
  )
}
