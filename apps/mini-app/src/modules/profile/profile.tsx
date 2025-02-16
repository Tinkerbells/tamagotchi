import { useProfile } from './hooks'
import { ProfileCard } from './profile-card'
import { ProfileStatistics } from './profile-statistics'

export function Profile() {
  const { pet, isPetLoading, statistics, isStatisticsLoading } = useProfile()

  if (!pet && isPetLoading) {
    return <div>Loading...</div>
  }

  if (!pet) {
    return <div>No pet data available.</div>
  }

  return (
    <div className="absolute bottom-[30vh] flex flex-col items-center justify-center gap-12">
      <ProfileCard name={pet.pet.name} createdDate={pet.pet.createdDate!} />
      {isStatisticsLoading || !statistics
        ? (
            <div>Loading...</div>
          )
        : (
            <ProfileStatistics
              walking={statistics.walking}
              meditation={statistics.meditation}
              gratitude={statistics.gratitude}
            />
          )}
    </div>
  )
}
