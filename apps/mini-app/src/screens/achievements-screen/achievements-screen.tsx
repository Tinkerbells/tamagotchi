import { WithNavbarScreen } from '../screen'
import { Achievements, BackgroundTexture } from '@/modules'

export const AchievementsScreen = () => {
  return (
    <WithNavbarScreen texture="highlight">
      <Achievements />
    </WithNavbarScreen>
  )
}
