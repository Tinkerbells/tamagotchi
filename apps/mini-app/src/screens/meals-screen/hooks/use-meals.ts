import * as React from 'react'

import { getFormatToday, useAuth } from '@/shared'
import { useGetMeals, useGetPet, useUpdateMeal } from '@/data'

import type { SelectedMeals } from '../types'

export function useMeals() {
  const today = getFormatToday()

  const { user } = useAuth()

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({
    userId: user.id,
  })

  const title = `Приём пищи с ${petData?.pet.name}`
  const description = 'Регулярное правильное питание - залог вашего здоровья!'

  const { mutate: updateMealsMutation, isPending: isMealUpdating }
    = useUpdateMeal()

  const {
    data: meals,
    isLoading: isMealsLoading,
    isSuccess,
  } = useGetMeals({
    userId: user.id,
  })

  const [selectedMeals, setSelectedMeals] = React.useState<SelectedMeals>({
    breakfast: false,
    snack: false,
    lunch: false,
    afternoon_snack: false,
    dinner: false,
  })

  React.useEffect(() => {
    if (meals) {
      if (isSuccess) {
        setSelectedMeals(meals.currentMeals)
      }
    }
  }, [meals, isSuccess])

  const toggleMeal = (meal: keyof SelectedMeals) => {
    setSelectedMeals(prev => ({
      ...prev,
      [meal]: !prev[meal],
    }))
  }

  const updateMeal = () => {
    updateMealsMutation({
      userId: user.id,
      ...selectedMeals,
    })
  }

  const isLoading = isMealsLoading && isPetDataLoading

  return {
    today,
    data: meals?.data,
    isLoading,
    title,
    description,
    toggleMeal,
    selectedMeals,
    updateMeal,
    isMealUpdating,
  }
}
