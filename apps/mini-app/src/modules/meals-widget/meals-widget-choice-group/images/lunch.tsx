import { Image } from '@/shared'
import lunch from '@public/images/meals/lunch.webp'

export const Lunch = () => {
  return (
    <figure className="relative mt-2 h-[90px]">
      <Image src={lunch} width={112} height={58} />
    </figure>
  )
}
