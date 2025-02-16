import * as React from 'react'

import type { GratitudeType } from '@/data'
import type { WeekDayProgressType } from '@/shared'

export interface GratitudesWidgetContextType {
  data: WeekDayProgressType[]
  current: GratitudeType[]
}

export const GratitudesWidgetContext
  = React.createContext<GratitudesWidgetContextType | null>(null)

export function useGratitudesWidgetContext() {
  const context = React.useContext(GratitudesWidgetContext)
  if (!context) {
    throw new Error(
      'useGratitudesWidgetContext must be used within a GratitudesWidgetContext',
    )
  }
  return context
}
