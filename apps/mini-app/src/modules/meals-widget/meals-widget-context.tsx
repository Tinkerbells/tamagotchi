import * as React from 'react'

import type { WeekDayProgressType } from '@/shared'
import type { SelectedMeals } from '@/screens/meals-screen/types'

export interface MealsWidgetContextType {
  today: string
  data: WeekDayProgressType[]
  selectedMeals: SelectedMeals
  toggleMeal: (meal: keyof SelectedMeals) => void
}

export const MealsWidgetContext
  = React.createContext<MealsWidgetContextType | null>(null)

export function useMealsWidgetContext() {
  const context = React.useContext(MealsWidgetContext)
  if (!context) {
    throw new Error(
      'useMealsWidgetContext must be used within a MealsWidgetContext',
    )
  }
  return context
}
