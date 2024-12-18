import { WithNavbarScreen } from '../screen'
import { BackgroundTexture, ShopWidget } from '@/modules'
import { useAuth } from '@/shared'

export const ShopScreen = () => {
  const { user } = useAuth()
  return (
    <WithNavbarScreen>
      <BackgroundTexture />
      <ShopWidget userId={user.id} />
    </WithNavbarScreen>
  )
}
