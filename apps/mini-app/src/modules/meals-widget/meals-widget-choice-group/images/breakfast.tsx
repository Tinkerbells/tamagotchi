import { Image } from '@/shared'

import breakfast from '/images/meals/breakfast.webp'

export function Breakfast() {
  return (
    <figure className="h-[80px]">
      <Image src={breakfast} width={116} height={50} />
    </figure>
  )
}
