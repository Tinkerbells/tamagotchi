import { WithNavbarScreen } from '../screen'
import { Achievements, BackgroundTexture } from '@/modules'
import { useAuth } from '@/shared'

export const AchievementsScreen = () => {
  const { user } = useAuth()
  return (
    <WithNavbarScreen>
      <BackgroundTexture variant="highlight" />
      <Achievements userId={user.id} />
    </WithNavbarScreen>
  )
}
