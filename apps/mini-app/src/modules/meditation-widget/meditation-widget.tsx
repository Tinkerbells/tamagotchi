import {
  MeditationContext,
  MeditationContextProps,
} from './meditation-widget-context'
import { MeditationWidgetPlayer } from './meditation-widget-music-player'

export const MeditationWidget = (props: MeditationContextProps) => {
  return (
    <MeditationContext.Provider value={props}>
      <div className="relative inset-0 flex h-[70vh] w-full flex-col justify-center">
        <MeditationWidgetPlayer />
      </div>
    </MeditationContext.Provider>
  )
}
