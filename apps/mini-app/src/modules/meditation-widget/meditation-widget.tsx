import { MeditationWidgetBackground } from './background'
import {
  MeditationContext,
  MeditationContextProps,
} from './meditation-widget-context'
import { MeditationWidgetPlayer } from './music-player'
import { MeditationWidgetThoughts } from './thoughts'
import { getIsTimer } from '@/screens/meditation-screen/utils'

export const MeditationWidget = (props: MeditationContextProps) => {
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
