import { WaterProgress } from './components'
import { WeekDayProgressType, WeekOverview } from '@/shared'

export interface WaterWidgetProps {
  today: string
  waterData: WeekDayProgressType[]
  currentProgress: number
  dailyNorm: number
  currentValue: number
}

export const WaterWidget = ({
  today,
  waterData,
  dailyNorm,
  currentValue,
  currentProgress,
}: WaterWidgetProps) => {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-start gap-8 overflow-x-hidden pt-24">
      <h1 className="font-vk text-[32px] font-semibold leading-[40px] text-[#0bb5b5] opacity-[0.16]">
        {today}
      </h1>
      <WaterProgress
        dailyNorm={dailyNorm}
        currentValue={currentValue}
        progress={currentProgress}
      />
      <WeekOverview values={waterData} variant="water" />
    </div>
  )
}
