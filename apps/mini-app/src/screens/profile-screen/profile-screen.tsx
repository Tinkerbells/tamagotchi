import { WithNavbarAndResourcesScreen } from '../screen'
import { BackgroundTexture, Profile } from '@/modules'
import { useAuth } from '@/shared'

export const ProfileScreen = () => {
  const { user } = useAuth()
  return (
    <WithNavbarAndResourcesScreen>
      <BackgroundTexture variant="highlight" />
      <Profile userId={user.id.toString()} />
    </WithNavbarAndResourcesScreen>
  )
}
