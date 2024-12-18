import {
  FoodWidget,
  GratitudeWidget,
  MeditationWidget,
  SleepWidget,
  WalkingWidget,
  WaterWidget,
} from './widgets'

export const ResourcesWidget = () => {
  return (
    <section className="absolute bottom-0 flex h-[210px] w-full items-center justify-center rounded-[18px] bg-white px-2 py-4">
      <div className="grid grid-cols-3 gap-x-8 gap-y-4">
        <FoodWidget value={50} />
        <WaterWidget value={50} />
        <MeditationWidget value={50} />
        <GratitudeWidget value={50} />
        <WalkingWidget value={50} />
        <SleepWidget value={50} />
      </div>
    </section>
  )
}
