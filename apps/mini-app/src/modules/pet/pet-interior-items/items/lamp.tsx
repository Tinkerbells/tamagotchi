import { getPetInterirorItem } from '../lib'
import { Image } from '@/shared'
import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

export const Lamp = () => {
  return (
    <figure className="absolute left-4 top-[17vh] h-[128px] w-[74px]">
      <Image
        src={getPetInterirorItem(INTERIOR_ITEMS_ENUM.lamp)}
        width={74}
        height={128}
      />
    </figure>
  )
}
