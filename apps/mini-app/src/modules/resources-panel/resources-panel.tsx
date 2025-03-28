import * as React from 'react'
import { cn } from '@tamagotchi/utils'
import { useNavigate } from 'react-router-dom'
import { ArrowBack, Button } from '@tamagotchi/ui'

import { Food, Heart, Meditation, Sleep, Walking, WaterDrop } from '@/shared'

import { ResourcesPanelSkeleton } from './resources-panel-skeleton'

const styles = {
  water: {
    backButtonBg: 'bg-[#e9fafe]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#0bb5b5]',
  },
  food: {
    backButtonBg: 'bg-[#fef1e9]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#b16c55]',
  },
  sleep: {
    backButtonBg: 'bg-[#fee9fa]',
    buttonBg: 'bg-[#fcc3dd]',
    primary: 'text-[#b1556c]',
  },
  meditation: {
    backButtonBg: 'bg-[#fef1e9]',
    buttonBg: 'bg-[#fcd1c3]',
    primary: 'text-[#ce766a]',
  },
  gratitude: {
    backButtonBg: 'bg-[#fef5e9]',
    buttonBg: 'bg-[#fef5e9]',
    primary: 'text-[#ce9c6a]',
  },
  walking: {
    backButtonBg: 'bg-[#FEF8E9]',
    buttonBg: 'bg-[#fcdec3]',
    primary: 'text-[#C0774E]',
  },
}

const icons = {
  water: <WaterDrop className="h-full w-full text-[#ebfdfe]" />,
  food: <Food className="h-[100px] w-[100px] text-[#fef0eb]" />,
  sleep: <Sleep className="h-[90px] w-[90px] text-[#FCC3DD]" />,
  meditation: <Meditation className="h-20 w-20 text-[#FCD1C3] opacity-30" />,
  gratitude: <Heart className="h-[90px] w-[90px] text-[#fef8ec]" />,
  walking: <Walking className="h-[100px] w-[100px] text-[#fce4d6]" />,
}

export interface ResourcesPanelProps extends React.ComponentProps<'div'> {
  isBackHidden?: boolean
  isLoading?: boolean
  title: string
  description: string
  variant: 'food' | 'water' | 'sleep' | 'meditation' | 'gratitude' | 'walking'
  renderPrimaryButton?: () => React.ReactElement
}

export function ResourcesPanel({
  isLoading,
  variant,
  title,
  description,
  isBackHidden,
  renderPrimaryButton,
  className,
}: ResourcesPanelProps) {
  const { backButtonBg, buttonBg, primary } = styles[variant]
  const icon = icons[variant]
  const navigate = useNavigate()

  return (
    <section
      className={cn(
        'absolute bottom-0 z-[999] flex w-full flex-col items-center overflow-hidden rounded-t-[18px] bg-white gap-4 px-4 py-6 h-[30vh]',
        className,
      )}
    >
      {isLoading
        ? (
            <ResourcesPanelSkeleton />
          )
        : (
            <>
              <div className="relative flex flex-col justify-center gap-3">
                <span className="font-vk z-20 text-xl font-semibold text-black">
                  {title}
                </span>
                <span className="font-vk text-text-secondary z-20 text-[15px] font-normal leading-[18px]">
                  {description}
                </span>
                <div className="absolute right-0 top-0 z-10 -mr-4 h-[100px] w-[100px] p-2">
                  {icon}
                </div>
              </div>
              <div className="mb-4 mt-auto flex w-full gap-2">
                {!isBackHidden && (
                  <Button
                    className={cn(
                      'aspect-square h-[44px] w-[44px] rounded-[17px] p-0',
                      backButtonBg,
                      primary,
                    )}
                    onClick={() => navigate(-1)}
                  >
                    <ArrowBack />
                  </Button>
                )}
                {renderPrimaryButton
                  ? (
                      renderPrimaryButton()
                    )
                  : (
                      <Button className={cn('h-[44px] w-full', buttonBg, primary)}>
                        Сохранить
                      </Button>
                    )}
              </div>
            </>
          )}
    </section>
  )
}
