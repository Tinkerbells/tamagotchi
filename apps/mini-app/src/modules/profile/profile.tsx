import { useProfile } from './hooks'
import { ProfileCard } from './profile-card'
import { ProfileStatistics } from './profile-statistics'

export const Profile = () => {
  const { pet, isPetLoading, statistics, isStatisticsLoading } = useProfile()

  if (!pet && isPetLoading) {
    return <div>Loading...</div>
  }

  if (!pet) {
    return <div>No pet data available.</div>
  }

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center pb-20">
      <ProfileCard name={pet.pet.name} createdDate={pet.pet.createdDate!} />
      {isStatisticsLoading || !statistics ? (
        <div>Loading...</div>
      ) : (
        <ProfileStatistics
          walking={statistics.walking}
          meditation={statistics.meditation}
          gratitude={statistics.gratitude}
        />
      )}
    </div>
  )
}
