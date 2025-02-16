import { Skeleton } from '@tamagotchi/ui'

export function MealsWidgetSkeleton() {
  return (
    <div className="h-[calc(100% - 30vh)] absolute bottom-[30vh] mb-8 flex w-full flex-col items-center justify-start gap-8 overflow-x-hidden pt-24">
      <Skeleton className="h-10 w-2/3" />
      <div className="grid h-full w-full grid-cols-2 place-items-center gap-y-7">
        <Skeleton className="h-[81px] w-[165px] rounded-lg" />
        <Skeleton className="h-[81px] w-[165px] rounded-lg" />
        <Skeleton className="h-[81px] w-[165px] rounded-lg" />
        <Skeleton className="h-[81px] w-[165px] rounded-lg" />
        <Skeleton className="col-span-2 h-[81px] w-[165px] rounded-lg" />
      </div>
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
