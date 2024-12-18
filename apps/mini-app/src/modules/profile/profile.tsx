import { ProfileCard } from './profile-card'
import { useGetPet, UserId } from '@/data'
import * as React from 'react'

interface ProfileProps {
  userId: UserId
}

export const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const { data: pet, isLoading } = useGetPet({ userId })

  if (!pet && isLoading) {
    return <div>Loading...</div>
  }

  if (!pet) {
    return <div>No pet data available.</div>
  }

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center pb-20">
      <ProfileCard name={pet.pet.name} createdDate={pet.pet.createdDate!} />
    </div>
  )
}
