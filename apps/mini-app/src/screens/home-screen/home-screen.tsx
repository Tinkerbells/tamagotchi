import { WithNavbarAndResourcesScreen } from '../screen'
import { Pet } from '@/modules'
import { useMoodStore } from '@/modules/resources-widget/store'

export const HomeScreen = () => {
  const { mood } = useMoodStore()
  return (
    <WithNavbarAndResourcesScreen
      className="bg-background-secondary"
      texture={mood!}
    >
      <Pet />
    </WithNavbarAndResourcesScreen>
  )
}
