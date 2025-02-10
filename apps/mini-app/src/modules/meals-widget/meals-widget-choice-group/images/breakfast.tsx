import { Image } from '@/shared'
import breakfast from '@public/images/meals/breakfast.webp'

export const Breakfast = () => {
  return (
    <figure className="h-[90px]">
      <Image src={breakfast} width={116} height={50} />
    </figure>
  )
}
