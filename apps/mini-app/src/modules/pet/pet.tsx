import { PetBackground, PetImage } from './pet-image'
import { PetMessageBubble } from './pet-message-bubble'
import { PetStatusText } from './pet-status-text'
import { useGetPet, useGetUserMood, UserId } from '@/data'
import * as React from 'react'

interface PetProps {
  userId: UserId
}
export const Pet: React.FC<PetProps> = ({ userId }) => {
  const { data: petData, isLoading } = useGetPet({ userId })

  const { data: mood, isLoading: isUserMoodLoading } = useGetUserMood({
    userId: userId,
  })

  if (!petData && isLoading) {
    return <div>Loading...</div>
  }

  if (!petData) {
    return <div>No pet data available.</div>
  }

  return (
    <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center">
      <PetBackground petMood="very_happy" />
      <PetImage accessory={petData.accessory} petMood="happy" />
      {!mood && !isUserMoodLoading && (
        <PetMessageBubble message="Рад тебя видеть! Как твои дела?" />
      )}
      <PetStatusText petName={petData.pet.name} petMood="happy" />
    </div>
  )
}
