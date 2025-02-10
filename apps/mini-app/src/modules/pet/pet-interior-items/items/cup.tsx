import { getPetInterirorItem } from '../lib'
import { Image } from '@/shared'
import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

export const Cup = () => {
  return (
    <figure className="absolute left-[16vw] top-72 h-[73px] w-[60px]">
      <Image
        src={getPetInterirorItem(INTERIOR_ITEMS_ENUM.cup)}
        width={60}
        height={73}
      />
    </figure>
  )
}
