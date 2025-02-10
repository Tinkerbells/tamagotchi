import { Heart } from 'lucide-react'
import { WeekOverviewProps } from './week-overview'
import { cn } from '@tamagotchi/utils'

export interface DayProgressProps {
  progress: number
  day: string
  month: string
  isToday?: boolean
  hasGratitude?: boolean
  variant: WeekOverviewProps['variant']
}

const styles = {
  water: {
    stroke: '#0bb5b5',
    fill: '#e9fafe',
  },
  food: {
    stroke: '#ef9b7a',
    fill: '#fef1e9',
  },
  sleep: {
    stroke: '#b1556c',
    fill: '#fee9ef',
  },
  gratitude: {
    stroke: '#ce9c6a',
    fill: '#fef5e9',
  },
}

export const DayProgress: React.FC<DayProgressProps> = ({
  progress,
  day,
  month,
  isToday,
  variant,
  hasGratitude
}) => {
  const radius = 22
  const center = 24
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress / 100)

  const { stroke, fill } = styles[variant]

  const textColor = `text-[${stroke}]`

  return (
    <div className='flex flex-col items-center'>
      {hasGratitude && (
        <Heart className='text-[#fef5e9] fill-[#fef5e9] w-4 h-[14px] mb-2' />
      )}
      <div className="relative flex overflow-visible w-12 items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 48 48">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill={isToday ? fill : 'none'}
            stroke={'#000000'}
            fillOpacity={0.8}
            strokeOpacity={0.08}
            strokeWidth={1.5}
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
          />
        </svg>
        <div className="absolute flex flex-col">
          <span
            className={cn(
              'text-center text-sm font-semibold',
              isToday ? textColor : 'text-black'
            )}
          >
            {day}
          </span>
          <span
            className={cn(
              '-mt-0.5 text-center text-xs font-normal',
              isToday ? textColor : 'text-text-secondary'
            )}
          >
            {month}
          </span>
        </div>
      </div>
    </div>
  )
}
