import { Button } from '@tamagotchi/ui'

import { MealsWidget, MealsWidgetSkeleton } from '@/modules/meals-widget'

import { useMeals } from './hooks'
import { WithResourcesPanel } from '../screen'

export function MealsScreen() {
  const {
    today,
    data,
    isLoading,
    title,
    description,
    isMealUpdating,
    selectedMeals,
    toggleMeal,
    updateMeal,
  } = useMeals()

  const SaveButton = () => {
    return (
      <Button
        className="h-[44px] w-full bg-[#fcd1c3] text-[#b16c55]"
        isLoading={isMealUpdating}
        onClick={() => updateMeal()}
      >
        Сохранить
      </Button>
    )
  }

  return (
    <WithResourcesPanel
      panel={{
        variant: 'food',
        title,
        description,
        isLoading,
        renderPrimaryButton: () => <SaveButton />,
      }}
    >
      {data && !isLoading
        ? (
            <MealsWidget
              selectedMeals={selectedMeals}
              toggleMeal={toggleMeal}
              today={today}
              data={data}
            />
          )
        : (
            <MealsWidgetSkeleton />
          )}
    </WithResourcesPanel>
  )
}
