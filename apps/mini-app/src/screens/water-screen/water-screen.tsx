import { WithResourcesPanel } from '../screen'
import { useWater } from './hooks'
import { WaterWidget, WaterWidgetSkeleton } from '@/modules'

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
  return (
    <WithResourcesPanel
      panel={{ variant: 'water', title, description, isLoading }}
      texture="water"
      background="water"
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
