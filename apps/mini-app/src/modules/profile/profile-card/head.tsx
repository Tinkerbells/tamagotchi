import head from '/images/profile/profile-head.webp'
import { Image } from '@/shared'

export const ProfileHead = () => {
  return (
    <figure className="h-[130px] w-[130px] -rotate-[6deg]">
      <Image src={head} width={113} height={113} />
    </figure>
  )
}
