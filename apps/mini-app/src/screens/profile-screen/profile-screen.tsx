import { Profile } from '@/modules'

import { WithNavbarAndResourcesScreen } from '../screen'

export function ProfileScreen() {
  return (
    <WithNavbarAndResourcesScreen texture="highlight">
      <Profile />
    </WithNavbarAndResourcesScreen>
  )
}
