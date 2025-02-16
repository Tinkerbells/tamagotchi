import { cn } from '@tamagotchi/utils'

import { WeekOverview } from '@/shared'

import type {
  NormsWidgetContextType,
} from './norms-widget-context'

import { NormsProgress } from './norms-widget-progress'
import {
  NormsWidgetContext,
  useNormsWidgetContext,
} from './norms-widget-context'

function NormsWidgetComponent() {
  const { today, data, variant } = useNormsWidgetContext()
  return (
    <div className="h-[calc(100% - 30vh)] absolute bottom-[30vh] mb-8 flex w-full flex-col items-center justify-start gap-8 overflow-x-hidden pt-24">
      <h1
        className={cn(
          'font-vk text-[32px] font-semibold leading-[40px] opacity-[0.16]',
          variant === 'water' ? 'text-[#0bb5b5]' : 'text-[#B1556C]',
        )}
      >
        {today}
      </h1>
      <NormsProgress />
      <WeekOverview values={data} variant={variant} />
    </div>
  )
}

export function NormsWidget(value: NormsWidgetContextType) {
  return (
    <NormsWidgetContext.Provider value={value}>
      <NormsWidgetComponent />
    </NormsWidgetContext.Provider>
  )
}
