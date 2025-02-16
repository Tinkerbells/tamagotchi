import { Image } from '@/shared'

import afternoon_snack from '/images/meals/afternoon_snack.webp'

export function AfternoonSnack() {
  return (
    <figure className="relative h-[80px]">
      <Image src={afternoon_snack} width={110} height={72} />
    </figure>
  )
}
