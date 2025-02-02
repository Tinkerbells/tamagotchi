import { Skeleton } from '@tamagotchi/ui'

export const WaterWidgetSkeleton = () => {
  return (
    <div className="absolute flex h-full w-screen flex-col items-center justify-start gap-8 pt-24">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="aspect-square w-[268px] rounded-full" />
      <div className="mt-12 flex gap-5">
        <Skeleton className="aspect-square h-12 rounded-full" />
        <Skeleton className="aspect-square h-12 rounded-full" />
        <Skeleton className="aspect-square h-12 rounded-full" />
        <Skeleton className="aspect-square h-12 rounded-full" />
        <Skeleton className="aspect-square h-12 rounded-full" />
        <Skeleton className="aspect-square h-12 rounded-full" />
      </div>
    </div>
  )
}
