import { Books, Cookies, Cup, Garlands, Lamp, Painting } from './items'
import { INTERIOR_ITEMS_ENUM, InteriorType } from '@tamagotchi/api/hc'

interface PetInteriorItemProps {
  type: InteriorType
}
export const PetInteriorItem = ({ type }: PetInteriorItemProps) => {
  switch (type) {
    case INTERIOR_ITEMS_ENUM.books:
      return <Books />
    case INTERIOR_ITEMS_ENUM.cup:
      return <Cup />
    case INTERIOR_ITEMS_ENUM.lamp:
      return <Lamp />
    case INTERIOR_ITEMS_ENUM.cookies:
      return <Cookies />
    case INTERIOR_ITEMS_ENUM.paintLandscape:
      return <Painting />
    case INTERIOR_ITEMS_ENUM.garlands:
      return <Garlands />
    default:
      return <Books />
  }
}
