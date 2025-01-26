import { moodStates, MoodType } from '@/data'

export const getPetMood = (mood: MoodType) => {
  switch (mood) {
    case moodStates.veryBored:
      return 'очень скучает'
    case moodStates.bored:
      return 'скучает'
    case moodStates.happy:
      return 'радостный'
    case moodStates.veryHappy:
      return 'очень радостный'
    default:
      return 'состояние'
  }
}
