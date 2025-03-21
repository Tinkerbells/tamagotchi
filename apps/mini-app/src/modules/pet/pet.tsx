import { usePet } from './hooks'
import { PetImage } from './pet-image'
import { PetStatusText } from './pet-status-text'
import { PetInteriorItems } from './pet-interior-items'
import { PetMessageBubble } from './pet-message-bubble'

export function Pet() {
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
    <div className="absolute h-[70vh] flex w-full flex-col items-center justify-center">
      <PetImage accessory={petData.accessory} petMood={petMood!} />
      <PetInteriorItems interiorItems={petData.interior_items} />
      {!userMood && !isUserMoodLoading && (
        <PetMessageBubble message="Рад тебя видеть! Как твои дела?" />
      )}
      {resources && !isResourcesLoading && (
        <PetStatusText resources={resources} petName={petData.pet.name} />
      )}
    </div>
  )
}
