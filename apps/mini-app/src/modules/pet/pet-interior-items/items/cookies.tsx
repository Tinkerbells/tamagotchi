import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

import { Image } from '@/shared'

import { getPetInterirorItem } from '../lib'

export function Cookies() {
  return (
    <figure className="absolute left-0 top-[38vh] h-[46px] w-[78px]">
      <Image
        src={getPetInterirorItem(INTERIOR_ITEMS_ENUM.cookies)}
        width={78}
        height={46}
      />
    </figure>
  )
}
