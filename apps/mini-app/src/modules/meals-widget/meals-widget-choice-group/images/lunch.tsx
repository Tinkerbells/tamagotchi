import { Image } from '@/shared'

import lunch from '/images/meals/lunch.webp'

export function Lunch() {
  return (
    <figure className="relative mt-2 h-[80px]">
      <Image src={lunch} width={112} height={58} />
    </figure>
  )
}
