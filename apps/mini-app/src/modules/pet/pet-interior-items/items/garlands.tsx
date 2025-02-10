import { getPetInterirorItem } from '../lib'
import { Image } from '@/shared'
import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

export const Garlands = () => {
  return (
    <figure className="absolute right-0 top-[3vh] h-[43px] w-full">
      <Image
        src={getPetInterirorItem(INTERIOR_ITEMS_ENUM.garlands)}
        width={1000}
        height={43}
      />
    </figure>
  )
}
