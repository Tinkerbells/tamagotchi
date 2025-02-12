import dinner from '/images/meals/dinner.webp'
import { Image } from '@/shared'

export const Dinner = () => {
  return (
    <figure className="relative -mt-2 h-[80px]">
      <Image src={dinner} width={96} height={92} />
    </figure>
  )
}
