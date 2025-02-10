import { Gems } from '@/shared'
import { WithResourcesPanel } from '../screen'
import { useMeditation } from './hooks'
import { getIsTimer } from './utils'
import { MeditationWidget } from '@/modules'
import { Button } from '@tamagotchi/ui'
import { cn } from '@tamagotchi/utils'

interface ControlsProps {
  isFinished: boolean;
  buttonText: string;
  timeLeft: string;
  isRunning: boolean;
  progress: number;
  loadAds: () => void;
  finishMeditation: () => void;
  toggleTimer: () => void;
  isFinishingLoading: boolean
}

export const MeditationScreen = () => {
  const {
    title,
    description,
    buttonText,
    isLoading,
    timeLeft,
    isRunning,
    isFinished,
    toggleTimer,
    loadAds,
    isFinishingLoading,
    progress,
    finishMeditation,
  } = useMeditation()

  return (
    <WithResourcesPanel
      texture="meditation"
      panel={{
        variant: 'meditation',
        title,
        description,
        isBackHidden: isFinished,
        isLoading,
        size: isFinished ? "L" : "M",
        renderPrimaryButton: () => (
          <Controls
            finishMeditation={finishMeditation}
            isFinishingLoading={isFinishingLoading}
            loadAds={loadAds}
            isFinished={isFinished}
            buttonText={buttonText}
            timeLeft={timeLeft}
            isRunning={isRunning}
            progress={progress}
            toggleTimer={toggleTimer}
          />

        ),
      }}
      className="bg-background-secondary"
    >
      <MeditationWidget isTimerRunning={isRunning} timerProgress={progress} />
    </WithResourcesPanel>
  )
}

const Controls = ({
  isFinished,
  buttonText,
  timeLeft,
  progress,
  loadAds,
  toggleTimer,
  isFinishingLoading,
  finishMeditation
}: ControlsProps) => {
  if (isFinished) {
    return (
      <div className='flex flex-col gap-2 w-full items-center mt-4'>
        <Button
          isLoading={isFinishingLoading}
          className="font-vk relative h-11 w-full justify-center overflow-hidden whitespace-nowrap px-4 text-sm gap-1 font-semibold tracking-tighter text-[#ce766a] bg-[#fcd1c3]"
          onClick={() => loadAds()}
        >
          Посмотреть рекламу и завершить <span className="flex items-center"><Gems /> +5</span>
        </Button>
        <Button
          onClick={finishMeditation}
          isLoading={isFinishingLoading}
          className="font-vk relative h-11 w-full justify-center overflow-hidden whitespace-nowrap px-4 text-sm font-semibold tracking-tighter text-[#ce766a] bg-white border-[2px] border-[#fcd1c3]"
        >
          Просто завершить медитацию
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => toggleTimer()}
      isLoading={isFinishingLoading}
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
