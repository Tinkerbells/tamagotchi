import { SelectedMeals } from '@/screens/meals-screen/types'
import { WeekDayProgressType } from '@/shared'
import * as React from 'react'

export type MealsWidgetContextType = {
  today: string
  data: WeekDayProgressType[]
  selectedMeals: SelectedMeals
  toggleMeal: (meal: keyof SelectedMeals) => void
}

export const MealsWidgetContext =
  React.createContext<MealsWidgetContextType | null>(null)

export const useMealsWidgetContext = () => {
  const context = React.useContext(MealsWidgetContext)
  if (!context) {
    throw new Error(
      'useMealsWidgetContext must be used within a MealsWidgetContext'
    )
  }
  return context
}
