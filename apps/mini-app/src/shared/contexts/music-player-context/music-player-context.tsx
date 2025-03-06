import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

import { routes } from '@/app/routes'

interface MusicPlayerRouteContextValue {
  /**
   * Whether the current route is the meditation page
   */
  isMeditationRoute: boolean
}

const MusicPlayerRouteContext = React.createContext<MusicPlayerRouteContextValue | undefined>(undefined)

/**
 * Provider component that monitors route changes and stops audio playback
 * when navigating away from the meditation page
 */
export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { stop } = useGlobalAudioPlayer()
  const isMeditationRoute = location.pathname === '/meditation'

  React.useEffect(() => {
    // Stop audio playback when navigating away from meditation page
    if (location.pathname !== routes.meditation) {
      stop()
    }
  }, [location.pathname, stop])

  const value = React.useMemo(() => ({
    isMeditationRoute,
  }), [isMeditationRoute])

  return (
    <MusicPlayerRouteContext.Provider value={value}>
      {children}
    </MusicPlayerRouteContext.Provider>
  )
}
