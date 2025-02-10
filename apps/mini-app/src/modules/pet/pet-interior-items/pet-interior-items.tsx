import { PetInteriorItem } from './pet-interior-item'
import { PetInteriorItemType } from '@/data'
import { InteriorType } from '@tamagotchi/api/hc'

interface PetInteriorItemsProps {
  interiorItems?: PetInteriorItemType[]
}

export const PetInteriorItems = ({ interiorItems }: PetInteriorItemsProps) => {
  return (
    <>
      {interiorItems?.map((item) => (
        <PetInteriorItem type={item.type as InteriorType} />
      ))}
    </>
  )
}
