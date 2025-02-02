import { WeekDayProgressType } from './types'
import { DayProgress } from './week-overview-day-progress'
import { useAutoScroll } from '@/shared/hooks'
import { useId } from 'react'

export interface WeekOverviewProps {
  variant: 'water' | 'food' | 'sleep'
  values: WeekDayProgressType[]
}

export const WeekOverview = ({ variant, values }: WeekOverviewProps) => {
  const containerRef = useAutoScroll<HTMLDivElement>([values])
  const id = useId()
  return (
    <div className="mt-12 w-full overflow-hidden">
      <div
        className="scrollbar-hide flex gap-5 overflow-y-scroll px-6"
        ref={containerRef}
      >
        {values.map(({ day, month, progress }, index) => (
          <DayProgress
            key={`${id}-${index}`}
            variant={variant}
            isToday={getIsToday(index, values.length - 1)}
            day={day}
            month={month}
            progress={progress}
          />
        ))}
      </div>
    </div>
  )
}

const getIsToday = (i: number, length: number) => {
  return i === length
}
