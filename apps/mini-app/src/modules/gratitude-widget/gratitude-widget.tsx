import { WeekOverview } from '@/shared'

import type { GratitudesWidgetContextType } from './gratitude-widget-context'

import { GratitudesWidgetMessages } from './gratitude-widget-messages'
import { GratitudesWidgetContext, useGratitudesWidgetContext } from './gratitude-widget-context'

function GratitudesWidgetComponent() {
  const { data } = useGratitudesWidgetContext()
  return (
    <div className="h-[70vh] absolute bottom-[30vh] mb-8 flex w-full flex-col items-center justify-start gap-8 overflow-x-hidden">
      <GratitudesWidgetMessages />
      <WeekOverview className="-mt-12 z-0" values={data} variant="gratitude" />
    </div>
  )
}

export function GratitudesWidget(value: GratitudesWidgetContextType) {
  return (
    <GratitudesWidgetContext.Provider value={value}>
      <GratitudesWidgetComponent />
    </GratitudesWidgetContext.Provider>
  )
}
