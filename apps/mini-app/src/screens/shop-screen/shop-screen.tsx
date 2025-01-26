import { WithNavbarScreen } from '../screen'
import { ShopWidget } from '@/modules'
import { useAuth } from '@/shared'

export const ShopScreen = () => {
  const { user } = useAuth()
  return (
    <WithNavbarScreen>
      <ShopWidget userId={user.id} />
    </WithNavbarScreen>
  )
}
