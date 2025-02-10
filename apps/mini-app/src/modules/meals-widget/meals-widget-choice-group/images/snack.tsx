import { Image } from '@/shared'
import snack from '@public/images/meals/snack.webp'

export const Snack = () => {
  return (
    <figure className="relative h-[100px]">
      <Image src={snack} width={89} height={75} />
    </figure>
  )
}
