import snack from '/images/meals/snack.webp'
import { Image } from '@/shared'

export const Snack = () => {
  return (
    <figure className="relative h-[80px]">
      <Image src={snack} width={89} height={75} />
    </figure>
  )
}
