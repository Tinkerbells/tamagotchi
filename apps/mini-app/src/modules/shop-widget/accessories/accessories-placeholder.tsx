import { Skeleton } from '@tamagotchi/ui'
import * as React from 'react'

export const AccessoriesPlaceholder = () => {
  const id = React.useId()
  return (
    <div>
      <p className="text-center text-base font-semibold">
        Аксессуары на питомца
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={`${id}-accessory-skeleton-${i}`}
            className="h-[150px] w-[155px] overflow-hidden rounded-[19px]"
          />
        ))}
      </div>
    </div>
  )
}
