import type { InteriorType } from '@tamagotchi/api/hc'

import type { PetInteriorItemType } from '@/data'

import { PetInteriorItem } from './pet-interior-item'

interface PetInteriorItemsProps {
  interiorItems?: PetInteriorItemType[]
}

export function PetInteriorItems({ interiorItems }: PetInteriorItemsProps) {
  return (
    <>
      {interiorItems?.map(item => (
        <PetInteriorItem key={item.itemId} type={item.type as InteriorType} />
      ))}
    </>
  )
}
