import afternoon_snack from '/images/meals/afternoon_snack.webp'
import breakfast from '/images/meals/breakfast.webp'
import dinner from '/images/meals/dinner.webp'
import lunch from '/images/meals/lunch.webp'
import snack from '/images/meals/snack.webp'

export const getMealImage = (
  type?: 'breakfast' | 'snack' | 'afternoon_snack' | 'lunch' | 'dinner'
) => {
  switch (type) {
    case 'breakfast':
      return breakfast
    case 'dinner':
      return dinner
    case 'afternoon_snack':
      return afternoon_snack
    case 'snack':
      return snack
    case 'lunch':
      return lunch
    default:
      return breakfast
  }
}
