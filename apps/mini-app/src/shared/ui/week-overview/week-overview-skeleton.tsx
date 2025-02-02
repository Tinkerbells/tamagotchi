import { Skeleton } from '@tamagotchi/ui'

export const WeekOverviewSkeleton = () => {
  return (
    <div className="mt-12 w-full overflow-hidden">
      <div className="scrollbar-hide flex gap-5 overflow-y-scroll px-6">
        <Skeleton className="aspect-square h-12 w-12 rounded-full" />
        <Skeleton className="aspect-square h-12 w-12 rounded-full" />
        <Skeleton className="aspect-square h-12 w-12 rounded-full" />
        <Skeleton className="aspect-square h-12 w-12 rounded-full" />
        <Skeleton className="aspect-square h-12 w-12 rounded-full" />
        <Skeleton className="aspect-square h-12 w-12 rounded-full" />
        <Skeleton className="aspect-square h-12 w-12 rounded-full" />
      </div>
    </div>
  )
}
