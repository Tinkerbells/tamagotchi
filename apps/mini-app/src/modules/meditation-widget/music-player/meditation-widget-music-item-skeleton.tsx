import { Skeleton } from '@tamagotchi/ui'

export const MeditationWidgetMusicItemSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-16" />
    </div>
  )
}
