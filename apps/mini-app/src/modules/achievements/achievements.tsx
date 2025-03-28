import { useAchievement } from './hooks'
import { AchievementsItem } from './achievements-item'

export function Achievements() {
  const { achievements, isLoading } = useAchievement()

  if (!achievements && isLoading) {
    return <div>Loading...</div>
  }

  if (!achievements) {
    return <div>No achievements data available.</div>
  }
  return (
    <div className="z-10 mt-32 flex flex-col gap-3">
      {achievements.map(achievement => (
        <AchievementsItem key={achievement.title} achievement={achievement} />
      ))}
    </div>
  )
}
