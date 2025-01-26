import { usePet } from './hooks'
import { PetImage } from './pet-image'
import { PetMessageBubble } from './pet-message-bubble'
import { PetStatusText } from './pet-status-text'

export const Pet = () => {
  const {
    petData,
    isPetLoading,
    userMood,
    isUserMoodLoading,
    petMood,
    resources,
    isResourcesLoading,
  } = usePet()

  if (!petData && isPetLoading) {
    return <div>Loading...</div>
  }

  if (!petData) {
    return <div>No pet data available.</div>
  }

  return (
    <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center">
      <PetImage accessory={petData.accessory} petMood={petMood} />
      {!userMood && !isUserMoodLoading && (
        <PetMessageBubble message="Рад тебя видеть! Как твои дела?" />
      )}
      {resources && !isResourcesLoading && (
        <PetStatusText resources={resources} petName={petData.pet.name} />
      )}
    </div>
  )
}
