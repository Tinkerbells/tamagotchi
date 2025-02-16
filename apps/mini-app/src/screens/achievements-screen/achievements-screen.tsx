import { Achievements } from '@/modules'

import { WithNavbarScreen } from '../screen'

export function AchievementsScreen() {
  return (
    <WithNavbarScreen texture="highlight">
      <Achievements />
    </WithNavbarScreen>
  )
}
