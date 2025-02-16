import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

import { Image } from '@/shared'

import { getPetInterirorItem } from '../lib'

export function Lamp() {
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
