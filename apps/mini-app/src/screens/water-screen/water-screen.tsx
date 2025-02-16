import { Button } from '@tamagotchi/ui'

import { NormsWidget, NormsWidgetSkeleton } from '@/modules'

import { useWater } from './hooks'
import { WithResourcesPanel } from '../screen'

export function WaterScreen() {
  const {
    today,
    waterData,
    dailyNorm,
    currentValue,
    isLoading,
    title,
    description,
    currentProgress,
    setCurrentProgress,
    updateWater,
    isWaterUpdating,
  } = useWater()

  const SaveButton = () => {
    return (
      <Button
        className="h-[44px] w-full bg-[#c3f9fc] text-[#0bb5b5]"
        isLoading={isWaterUpdating}
        onClick={() => updateWater()}
      >
        Сохранить
      </Button>
    )
  }

  return (
    <WithResourcesPanel
      panel={{
        variant: 'water',
        title,
        description,
        isLoading,
        renderPrimaryButton: () => <SaveButton />,
      }}
      texture="water"
    >
      {!isLoading && waterData
        ? (
            <NormsWidget
              currentValue={currentValue}
              currentProgress={currentProgress}
              today={today}
              data={waterData}
              onProgressChange={setCurrentProgress}
              dailyNorm={dailyNorm}
              variant="water"
            />
          )
        : (
            <NormsWidgetSkeleton />
          )}
    </WithResourcesPanel>
  )
}
