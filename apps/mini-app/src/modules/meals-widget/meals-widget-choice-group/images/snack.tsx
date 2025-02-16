import { Image } from '@/shared'

import snack from '/images/meals/snack.webp'

export function Snack() {
  return (
    <figure className="relative h-[80px]">
      <Image src={snack} width={89} height={75} />
    </figure>
  )
}
