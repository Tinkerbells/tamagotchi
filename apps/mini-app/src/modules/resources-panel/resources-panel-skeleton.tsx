import { Skeleton } from '@tamagotchi/ui'

export function ResourcesPanelSkeleton() {
  return (
    <>
      <div className="relative flex w-full flex-col justify-center gap-3 py-14">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full gap-2">
        <Skeleton className="h-[44px] w-full" />
      </div>
    </>
  )
}
