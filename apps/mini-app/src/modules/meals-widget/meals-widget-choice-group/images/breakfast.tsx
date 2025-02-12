import breakfast from '/images/meals/breakfast.webp'
import { Image } from '@/shared'

export const Breakfast = () => {
  return (
    <figure className="h-[80px]">
      <Image src={breakfast} width={116} height={50} />
    </figure>
  )
}
