import { SleepProgress } from './components'
import { WeekDayProgressType, WeekOverview } from '@/shared'

export interface SleepWidgetProps {
  today: string
  waterData: WeekDayProgressType[]
  currentProgress: number
  dailyNorm: number
  currentValue: number
}

export const SleepWidget = ({
  today,
  waterData,
  dailyNorm,
  currentValue,
  currentProgress,
}: SleepWidgetProps) => {
  return (
    <div className="h-[calc(100% - 30vh)] absolute bottom-[30vh] mb-8 flex w-full flex-col items-center justify-start gap-8 overflow-x-hidden pt-24">
      <h1 className="font-vk text-[32px] font-semibold leading-[40px] text-[#b1556c] opacity-[0.16]">
        {today}
      </h1>
      <SleepProgress
        variant="sleep"
        dailyNorm={dailyNorm}
        currentValue={currentValue}
        progress={currentProgress}
      />
      <WeekOverview values={waterData} variant="sleep" />
    </div>
  )
}
