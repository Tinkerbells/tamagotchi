import * as React from 'react'

export interface MeditationContextProps {
  isTimerRunning: boolean
  timerProgress: number
}

export const MeditationContext =
  React.createContext<MeditationContextProps | null>(null)

export const useMeditationContext = () => {
  const context = React.useContext(MeditationContext)
  if (!context) {
    throw new Error(
      'useMeditationContext must be used within a MeditationProvider'
    )
  }
  return context
}
