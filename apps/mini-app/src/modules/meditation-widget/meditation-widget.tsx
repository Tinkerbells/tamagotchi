import { getIsTimer } from '@/screens/meditation-screen/utils'

import type {
  MeditationContextProps,
} from './meditation-widget-context'

import { MeditationWidgetThoughts } from './thoughts'
import { MeditationWidgetPlayer } from './music-player'
import { MeditationWidgetBackground } from './background'
import {
  MeditationContext,
} from './meditation-widget-context'

export function MeditationWidget(props: MeditationContextProps) {
  return (
    <MeditationContext.Provider value={props}>
      <div className="relative inset-0 flex h-[70vh] w-full flex-col justify-center">
        <MeditationWidgetBackground />
        {getIsTimer() && (
          <>
            <MeditationWidgetPlayer />
            <MeditationWidgetThoughts />
          </>
        )}
      </div>
    </MeditationContext.Provider>
  )
}
