import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

import { Image } from '@/shared'

import { getPetInterirorItem } from '../lib'

export function Cup() {
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
