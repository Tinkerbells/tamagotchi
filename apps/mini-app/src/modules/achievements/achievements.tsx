import { AchievementsItem } from './achievements-item'
import { useGetAchievements, UserId } from '@/data'
import * as React from 'react'

interface AchievementsProps {
  userId: UserId
}
export const Achievements: React.FC<AchievementsProps> = ({ userId }) => {
  const { data: achievements, isLoading } = useGetAchievements({ userId })

  if (!achievements && isLoading) {
    return <div>Loading...</div>
  }

  if (!achievements) {
    return <div>No achievements data available.</div>
  }
  return (
    <div className="z-10 mt-32 flex flex-col gap-3">
      {achievements.map((achievement) => (
        <AchievementsItem key={achievement.title} achievement={achievement} />
      ))}
    </div>
  )
}
