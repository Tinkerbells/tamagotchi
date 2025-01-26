import { useResources } from './hooks'
import {
  GratitudeWidget,
  MealWidget,
  MeditationWidget,
  SleepWidget,
  WalkingWidget,
  WaterWidget,
} from './widgets'

export const ResourcesWidget = () => {
  const { resources, isLoading } = useResources()

  return (
    <section className="absolute bottom-0 flex h-[210px] w-full items-center justify-center rounded-[18px] bg-white px-2 py-4">
      {isLoading || !resources ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
          <MealWidget value={resources.meal} />
          <WaterWidget value={resources.water} />
          <MeditationWidget value={resources.meditation} />
          <GratitudeWidget value={resources.gratitude} />
          <WalkingWidget value={resources.walking} />
          <SleepWidget value={resources.sleep} />
        </div>
      )}
    </section>
  )
}
