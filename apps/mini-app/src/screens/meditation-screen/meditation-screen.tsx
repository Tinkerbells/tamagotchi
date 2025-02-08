import { WithResourcesPanel } from '../screen'
import { useMeditation } from './hooks'
import { getIsTimer } from './utils'
import { MeditationWidget } from '@/modules'
import { Button } from '@tamagotchi/ui'

export const MeditationScreen = () => {
  const {
    title,
    description,
    buttonText,
    isLoading,
    timeLeft,
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    toggleTimer,
    finishSession,
    progress,
  } = useMeditation()

  const PrimaryButton = () => {
    return (
      <Button
        onClick={() => toggleTimer()}
        className="font-vk relative h-11 w-full justify-center overflow-hidden whitespace-nowrap px-4 text-sm font-semibold tracking-tighter text-[#ce766a]"
      >
        {getIsTimer() && (
          <>
            <span className="z-20 mr-auto flex">{timeLeft}</span>
            <ButtonDivider />
          </>
        )}
        <span className="z-20">{buttonText}</span>
        <span
          className="absolute left-0 z-10 h-full bg-[#fcd1c3] transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
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
    >
      {getIsTimer() && (
        <MeditationWidget isTimerRunning={isRunning} timerProgress={progress} />
      )}
    </WithResourcesPanel>
  )
}

const ButtonDivider = () => {
  return (
    <svg
      width="3"
      height="44"
      viewBox="0 0 3 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="z-20 mr-2"
    >
      <path d="M2 0V44" stroke="#CE766A" strokeOpacity="0.16" />
      <path d="M1 0V44" stroke="white" strokeOpacity="0.16" />
    </svg>
  )
}
