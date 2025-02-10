import { getPetInterirorItem } from '../lib'
import { Image } from '@/shared'
import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

export const Books = () => {
  return (
    <figure className="absolute right-0 top-[34vh] h-[61px] w-[74px]">
      <Image
        src={getPetInterirorItem(INTERIOR_ITEMS_ENUM.books)}
        width={74}
        height={61}
      />
    </figure>
  )
}
