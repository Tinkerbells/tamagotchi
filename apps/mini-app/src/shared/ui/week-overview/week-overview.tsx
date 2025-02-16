import { useId } from 'react'
import * as React from 'react'
import { cn } from '@tamagotchi/utils'

import { useAutoScroll } from '@/shared/hooks'

import type { WeekDayProgressType } from './types'

import { DayProgress } from './week-overview-day-progress'

export interface WeekOverviewProps extends React.ComponentProps<'div'> {
  variant: 'water' | 'food' | 'sleep' | 'gratitude'
  values: WeekDayProgressType[]
}

export function WeekOverview({
  variant,
  values,
  className,
}: WeekOverviewProps) {
  const containerRef = useAutoScroll<HTMLDivElement>([values])
  const id = useId()
  return (
    <div className={cn('mt-12 w-full', className)}>
      <div
        className="scrollbar-hide flex items-end gap-5 overflow-x-scroll px-6"
        ref={containerRef}
      >
        {values.map(({ day, month, progress }, index) => (
          <DayProgress
            key={`${id}-${index}`}
            variant={variant}
            isToday={getIsToday(index, values.length - 1)}
            day={day}
            month={month}
            hasGratitude={progress === 1}
            progress={variant === 'gratitude' ? 0 : progress}
          />
        ))}
      </div>
    </div>
  )
}

function getIsToday(i: number, length: number) {
  return i === length
}
