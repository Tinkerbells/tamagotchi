import { getPetInterirorItem } from '../lib'
import { Image } from '@/shared'
import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

export const Painting = () => {
  return (
    <figure className="absolute right-4 top-[12vh] h-[61px] w-[74px]">
      <Image
        src={getPetInterirorItem(INTERIOR_ITEMS_ENUM.paintLandscape)}
        width={74}
        height={61}
      />
    </figure>
  )
}
