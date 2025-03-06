import { useEffect } from 'react'
import { Button, Drawer, DrawerContent } from '@tamagotchi/ui'

import { WalkingWidget } from '@/modules'
import { Gems, GEMS_TO_ADD, Walking } from '@/shared'

import { useWalking } from './hooks'
import { WithResourcesPanel } from '../screen'
import { getIsWalkingTimer } from './hooks/use-walking-timer'

interface ControlsProps {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  finishWalking: () => void
  finishWalkingWithAds: () => void
  isFinishingLoading: boolean
  isFinishingWithAdsLoading: boolean
}

export function WalkingScreen() {
  const {
    walkingStats,
    isTracking,
    isLoading,
    buttonText,
    timeLeft,
    progress,
    toggleTimer,
    startTracking,
    stopTracking,
    finishWalking,
    finishWalkingWithAds,
    isFinishDrawerOpen,
    handleDrawerOpen,
    title,
    description,
    isFinishingLoading,
    isFinishingWithAdsLoading,
    isFinished,
  } = useWalking()

  const avatarUrl = '/images/walking/pet-avatar.webp'

  return (
    <WithResourcesPanel
      panel={{
        variant: 'walking',
        title,
        description,
        isBackHidden: isFinished,
        isLoading,
        renderPrimaryButton: () => (
          <Button
            onClick={() => {
              if (!isFinished) {
                toggleTimer()
              }

              if (isTracking || isFinished) {
                handleDrawerOpen(true)
              }
            }}
            isLoading={isFinishingLoading}
            className="font-vk relative h-11 w-full justify-center overflow-hidden whitespace-nowrap px-4 text-sm font-semibold tracking-tighter text-[#ce766a]"
          >
            {getIsWalkingTimer() && (
              <>
                <span className="z-20 mr-auto flex">{timeLeft}</span>
                <ButtonDivider />
              </>
            )}
            <span className="z-20">{buttonText}</span>
            <span
              className="absolute left-0 z-10 h-full bg-[#fce4d6] transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </Button>
        ),
      }}
      texture="meditation"
    >
      <FinishDrawer
        title={title}
        description={description}
        isOpen={isFinishDrawerOpen}
        setIsOpen={handleDrawerOpen}
        finishWalking={finishWalking}
        finishWalkingWithAds={finishWalkingWithAds}
        isFinishingLoading={isFinishingLoading}
        isFinishingWithAdsLoading={isFinishingWithAdsLoading}
      />

      <WalkingWidget
        currentPosition={walkingStats.lastPosition}
        positions={walkingStats.positions}
        isWalking={walkingStats.isWalking}
        avatarUrl={avatarUrl}
      />

      {/* Walking stats badge */}
      {walkingStats.lastPosition && (
        <div className="absolute bottom-8 left-0 right-0 mx-auto w-[80%] bg-white bg-opacity-80 rounded-lg p-3 shadow-md">
          <div className="flex justify-between">
            <div>
              <div className="text-xs text-gray-600">Пройдено</div>
              <div className="font-bold text-lg">
                {walkingStats.todayDistance.toFixed(2)}
                {' '}
                км
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Прогресс</div>
              <div className="font-bold text-lg">
                {progress}
                %
              </div>
            </div>
          </div>

          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#ce766a] h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </WithResourcesPanel>
  )
}

function FinishDrawer({
  title,
  description,
  setIsOpen,
  isOpen,
  finishWalking,
  finishWalkingWithAds,
  isFinishingLoading,
  isFinishingWithAdsLoading,
}: ControlsProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="shadow-profile-card mt-0 h-[35vh] gap-3 px-4 py-6">
        <div className="relative flex flex-col justify-center gap-2">
          <span className="font-vk z-20 text-xl font-semibold text-black">
            {title}
          </span>
          <span className="font-vk text-text-secondary z-20 text-[15px] font-normal leading-[18px]">
            {description}
          </span>
          <div className="absolute right-0 top-0 z-10 -mr-4 h-[100px] w-[100px] p-2">
            <Walking className="h-[100px] w-[100px] text-[#fce4d6]" />
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col items-center gap-2">
          <Button
            isLoading={isFinishingWithAdsLoading}
            className="font-vk relative h-11 w-full justify-center gap-1 overflow-hidden whitespace-nowrap bg-[#fce4d6] px-4 text-sm font-semibold tracking-tighter text-[#ce766a]"
            onClick={finishWalkingWithAds}
          >
            Посмотреть рекламу и завершить
            {' '}
            <span className="flex items-center">
              <Gems />
              {' '}
              +
              {GEMS_TO_ADD}
            </span>
          </Button>
          <Button
            onClick={finishWalking}
            isLoading={isFinishingLoading}
            className="font-vk relative h-11 w-full justify-center overflow-hidden whitespace-nowrap border-[2px] border-[#fce4d6] bg-white px-4 text-sm font-semibold tracking-tighter text-[#ce766a]"
          >
            Просто завершить прогулку
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function ButtonDivider() {
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
