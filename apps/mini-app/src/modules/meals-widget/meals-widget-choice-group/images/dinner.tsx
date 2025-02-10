import { Image } from '@/shared'
import dinner from '/images/meals/dinner.webp'

export const Dinner = () => {
  return (
    <figure className="relative -mt-2 h-[110px]">
      <Image src={dinner} width={96} height={92} />
    </figure>
  )
}
