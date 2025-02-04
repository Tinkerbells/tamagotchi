import { WithResourcesPanel } from '../screen'
import { useSleep } from './hooks'
import { SleepWidget, SleepWidgetSkeleton } from '@/modules'

export const SleepScreen = () => {
  const {
    title,
    description,
    isLoading,
    today,
    waterData,
    currentProgress,
    currentValue,
    dailyNorm,
  } = useSleep()
  return (
    <WithResourcesPanel
      panel={{ variant: 'sleep', title, description, isLoading }}
      texture="sleep"
      background="sleep"
    >
      {!isLoading && waterData ? (
        <SleepWidget
          currentValue={currentValue}
          dailyNorm={dailyNorm}
          today={today}
          waterData={waterData}
          currentProgress={currentProgress}
        />
      ) : (
        <SleepWidgetSkeleton />
      )}
    </WithResourcesPanel>
  )
}
