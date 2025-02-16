import { WalkingWidget } from '@/modules'

import { useWalking } from './hooks'
import { WithResourcesPanel } from '../screen'

export function WalkingScreen() {
  const { title, description, isLoading } = useWalking()
  return (
    <WithResourcesPanel
      panel={{
        variant: 'gratitude',
        title,
        description,
        isLoading,
      }}
      texture="meditation"
    >
      <WalkingWidget />
    </WithResourcesPanel>
  )
}
