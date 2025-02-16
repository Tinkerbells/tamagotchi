import * as React from 'react'

import type { CircleProgressProps, WeekDayProgressType } from '@/shared'

export interface NormsWidgetContextType {
  variant: 'water' | 'sleep'
  today: string
  data: WeekDayProgressType[]
  currentProgress: number
  dailyNorm: number
  currentValue: number
  onProgressChange: CircleProgressProps['onProgressChange']
}

export const NormsWidgetContext
  = React.createContext<NormsWidgetContextType | null>(null)

export function useNormsWidgetContext() {
  const context = React.useContext(NormsWidgetContext)
  if (!context) {
    throw new Error(
      'useNormsWidgetContext must be used within a NormsWidgetContext',
    )
  }
  return context
}
