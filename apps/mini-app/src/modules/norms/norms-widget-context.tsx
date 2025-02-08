import { CircleProgressProps, WeekDayProgressType } from '@/shared'
import * as React from 'react'

export type NormsWidgetContextType = {
  variant: 'water' | 'sleep'
  today: string
  data: WeekDayProgressType[]
  currentProgress: number
  dailyNorm: number
  currentValue: number
  onProgressChange: CircleProgressProps['onProgressChange']
}

export const NormsWidgetContext =
  React.createContext<NormsWidgetContextType | null>(null)

export const useNormsWidgetContext = () => {
  const context = React.useContext(NormsWidgetContext)
  if (!context) {
    throw new Error(
      'useNormsWidgetContext must be used within a NormsWidgetContext'
    )
  }
  return context
}
