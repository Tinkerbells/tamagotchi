import { GratitudeType } from '@/data'
import { WeekDayProgressType } from '@/shared'
import * as React from 'react'

export type GratitudesWidgetContextType = {
  data: WeekDayProgressType[]
  current: GratitudeType[]
}

export const GratitudesWidgetContext =
  React.createContext<GratitudesWidgetContextType | null>(null)

export const useGratitudesWidgetContext = () => {
  const context = React.useContext(GratitudesWidgetContext)
  if (!context) {
    throw new Error(
      'useGratitudesWidgetContext must be used within a GratitudesWidgetContext'
    )
  }
  return context
}
