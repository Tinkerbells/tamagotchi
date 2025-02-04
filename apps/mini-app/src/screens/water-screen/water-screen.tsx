import { WithResourcesPanel } from '../screen'
import { useWater } from './hooks'
import { WaterWidget, WaterWidgetSkeleton } from '@/modules'
import { Button } from '@tamagotchi/ui'

export const WaterScreen = () => {
  const {
    title,
    description,
    isLoading,
    today,
    waterData,
    currentProgress,
    currentValue,
    dailyNorm,
  } = useWater()

  const SaveButton = () => {
    return (
      <Button
        className="h-[44px] w-full bg-[#c3f9fc] text-[#0bb5b5]"
        isLoading={true}
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
      {!isLoading && waterData ? (
        <WaterWidget
          currentValue={currentValue}
          dailyNorm={dailyNorm}
          today={today}
          waterData={waterData}
          currentProgress={currentProgress}
        />
      ) : (
        <WaterWidgetSkeleton />
      )}
    </WithResourcesPanel>
  )
}
