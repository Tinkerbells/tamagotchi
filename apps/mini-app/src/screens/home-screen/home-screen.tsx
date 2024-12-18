import { WithNavbarAndResourcesScreen } from '../screen'
import { Pet } from '@/modules'
import { useAuth } from '@/shared'

export const HomeScreen = () => {
  const { user } = useAuth()
  return (
    <WithNavbarAndResourcesScreen>
      <Pet userId={user.id} />
    </WithNavbarAndResourcesScreen>
  )
}
