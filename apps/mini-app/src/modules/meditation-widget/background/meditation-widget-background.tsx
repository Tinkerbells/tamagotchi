import { Image } from '@/shared'
import petMeditationImage from '/images/meditation/image.webp'

export const MeditationWidgetBackground = () => {
  return (
    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2">
      <div className="relative flex h-[336px] w-[336px] items-center justify-center">
        <Circles />
        <figure className="absolute h-[267px] w-[217px]">
          <Image src={petMeditationImage} width={217} height={267} />
        </figure>
      </div>
    </div>
  )
}

const Circles = () => {
  return (
    <svg
      width="338"
      height="338"
      viewBox="0 0 338 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="169" cy="169" r="41" stroke="#EB6D26" strokeOpacity="0.24" />
      <circle cx="166" cy="169" r="98" stroke="#EB6D26" strokeOpacity="0.16" />
      <circle
        cx="169"
        cy="169"
        r="168"
        stroke="#EB6D26"
        strokeOpacity="0.12"
      />
    </svg>
  )
}
