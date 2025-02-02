import { WithNavbarAndResourcesScreen } from '../screen'
import { Profile } from '@/modules'

export const ProfileScreen = () => {
  return (
    <WithNavbarAndResourcesScreen texture="highlight">
      <Profile />
    </WithNavbarAndResourcesScreen>
  )
}
