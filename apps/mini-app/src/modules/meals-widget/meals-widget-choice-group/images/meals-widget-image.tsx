import { AfternoonSnack } from './afternoon-snack'
import { Breakfast } from './breakfast'
import { Dinner } from './dinner'
import { Lunch } from './lunch'
import { Snack } from './snack'

interface MealsWidgetImageProps {
  type: 'breakfast' | 'snack' | 'afternoon_snack' | 'lunch' | 'dinner'
}

export const MealsWidgetImage = ({ type }: MealsWidgetImageProps) => {
  switch (type) {
    case 'breakfast':
      return <Breakfast />
    case 'dinner':
      return <Dinner />
    case 'afternoon_snack':
      return <AfternoonSnack />
    case 'snack':
      return <Snack />
    case 'lunch':
      return <Lunch />
    default:
      return <Breakfast />
  }
}
