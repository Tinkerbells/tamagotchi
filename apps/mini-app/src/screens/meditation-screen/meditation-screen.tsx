import { WithResourcesPanel } from '../screen'
import { useMeditation } from './hooks'
import { Button } from '@tamagotchi/ui'

export const MeditationScreen = () => {
  const {
    title,
    description,
    isLoading,
    timeLeft,
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    finishSession,
  } = useMeditation()

  const PrimaryButton = () => {
    return (
      <Button
        onClick={() => (isRunning ? stopTimer() : startTimer())}
        className="relative w-full overflow-hidden"
      >
        <span className="z-20 mr-auto flex">
          {timeLeft}
          {isRunning ? 'Завершить' : 'Начать'}
        </span>
        <span className="absolute z-10 w-1/2 bg-[#fcd1c3]" />
      </Button>
    )
  }

  return (
    <WithResourcesPanel
      panel={{
        variant: 'meditation',
        title,
        description,
        isLoading,
        renderPrimaryButton: () => <PrimaryButton />,
      }}
      texture="meditation"
      className="bg-background-secondary"
    ></WithResourcesPanel>
  )
}

const renderTimerButton = () => {}
