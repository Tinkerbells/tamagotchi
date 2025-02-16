import { Skeleton } from '@tamagotchi/ui'

export function NormsWidgetSkeleton() {
  return (
    <div className="h-[calc(100% - 30vh)] absolute bottom-[30vh] mb-8 flex w-full flex-col items-center justify-start gap-8 overflow-x-hidden pt-24">
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
