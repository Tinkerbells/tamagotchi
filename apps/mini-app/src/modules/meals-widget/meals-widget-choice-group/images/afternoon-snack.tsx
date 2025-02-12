import afternoon_snack from '/images/meals/afternoon_snack.webp'
import { Image } from '@/shared'

export const AfternoonSnack = () => {
  return (
    <figure className="relative h-[80px]">
      <Image src={afternoon_snack} width={110} height={72} />
    </figure>
  )
}
