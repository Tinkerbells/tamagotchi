import { Pet } from '@/modules'
import { useMoodStore } from '@/modules/resources-widget/store'

import { WithNavbarAndResourcesScreen } from '../screen'

export function HomeScreen() {
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
