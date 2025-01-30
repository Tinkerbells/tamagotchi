import { useWaterWidget } from './hooks'
import { CircleProgress } from '@/shared'

export const WaterWidget = () => {
  const { today } = useWaterWidget()
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-start pt-40">
      <h1 className="font-vk text-[32px] font-semibold leading-[40px] text-[#0bb5b5] opacity-[0.16]">
        {today}
      </h1>
      <CircleProgress progress={33} />
    </div>
  )
}
