import { Button } from '@tamagotchi/ui'

import { NormsWidget, NormsWidgetSkeleton } from '@/modules'

import { useSleep } from './hooks'
import { WithResourcesPanel } from '../screen'

export function SleepScreen() {
  const {
    today,
    data,
    dailyNorm,
    currentValue,
    isLoading,
    title,
    description,
    currentProgress,
    setCurrentProgress,
    updateSleep,
    isSleepUpdating,
  } = useSleep()

  const SaveButton = () => {
    return (
      <Button
        className="h-[44px] w-full bg-[#fcc3dd] text-[#B1556C]"
        isLoading={isSleepUpdating}
        onClick={() => updateSleep()}
      >
        Сохранить
      </Button>
    )
  }

  return (
    <WithResourcesPanel
      panel={{
        variant: 'sleep',
        title,
        description,
        isLoading,
        renderPrimaryButton: () => <SaveButton />,
      }}
      texture="sleep"
    >
      {!isLoading && data
        ? (
            <NormsWidget
              currentValue={currentValue}
              currentProgress={currentProgress}
              today={today}
              data={data}
              onProgressChange={setCurrentProgress}
              dailyNorm={dailyNorm}
              variant="sleep"
            />
          )
        : (
            <NormsWidgetSkeleton />
          )}
    </WithResourcesPanel>
  )
}
