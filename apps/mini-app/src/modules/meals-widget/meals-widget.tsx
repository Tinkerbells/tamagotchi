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
    <div className="h-[calc(100% - 30vh)] absolute bottom-[30vh] mb-8 flex w-full flex-col items-center justify-start gap-8 overflow-x-hidden pt-24">
      <h1 className="font-vk text-[32px] font-semibold leading-[40px] text-[#ef9b7a] opacity-[0.16]">
        {today}
      </h1>
      <MealsWidgetChoiceGroup />
      <WeekOverview values={data} variant="food" />
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
