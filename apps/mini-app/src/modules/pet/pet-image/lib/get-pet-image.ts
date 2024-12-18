import { MoodType } from '../../pet-status-text'
import petBored from '/images/pet/pet-bored.webp'
import petHappy from '/images/pet/pet-happy.webp'
import petVeryBored from '/images/pet/pet-very-bored.webp'
import petVeryHappy from '/images/pet/pet-very-happy.webp'

export const getPetImage = (mood: MoodType) => {
  switch (mood) {
    case 'very_bored':
      return petVeryBored
    case 'bored':
      return petBored
    case 'happy':
      return petHappy
    case 'very_happy':
      return petVeryHappy
    default:
      return petBored
  }
}
