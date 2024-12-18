import * as React from 'react'

export const moodStates = {
  veryBored: 'very_bored', // Айзек очень скучает
  bored: 'bored', // Айзек скучает
  happy: 'happy', // Айзек радостный
  veryHappy: 'very_happy', // Айзек очень радостный
} as const

export type MoodType = (typeof moodStates)[keyof typeof moodStates]

interface PetStatusTextProps {
  petName: string
  petMood: MoodType
  lowestReources?: string
}

export const PetStatusText: React.FC<PetStatusTextProps> = ({
  petName,
  petMood,
}) => {
  return (
    <div className="w-[331px]">
      <h2 className="text-center text-xl font-bold">
        {petName} {getPetMoodText(petMood)}
      </h2>
      <p className="text-text-secondary mt-2 text-center">
        Вы давно не{' '}
        <span className="text-text-highlight underline">медитировали</span> и не{' '}
        <span className="text-text-highlight underline">гуляли</span> с вашим
        питомцем.. Возможно сейчас самое время?
      </p>
    </div>
  )
}

const getPetMoodText = (mood: MoodType) => {
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
