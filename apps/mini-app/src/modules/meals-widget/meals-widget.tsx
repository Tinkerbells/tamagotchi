import { WeekOverview } from '@/shared'

import type {
  MealsWidgetContextType,
} from './meals-widget-context'

import { MealsWidgetChoiceGroup } from './meals-widget-choice-group'
import {
  MealsWidgetContext,
  useMealsWidgetContext,
} from './meals-widget-context'

function MealsWidgetComponent() {
  const { today, data } = useMealsWidgetContext()
  return (
    <div className="h-[70vh] absolute justify-between flex w-full flex-col items-center overflow-hidden pt-[5vh]">
      <h1 className="font-vk text-[32px] font-semibold leading-[40px] text-[#ef9b7a] opacity-[0.16] mb-[5vh]">
        {today}
      </h1>
      <MealsWidgetChoiceGroup />
      <WeekOverview className="mt-[2vh]" values={data} variant="food" />
    </div>
  )
}

export function MealsWidget(value: MealsWidgetContextType) {
  return (
    <MealsWidgetContext.Provider value={value}>
      <MealsWidgetComponent />
    </MealsWidgetContext.Provider>
  )
}
