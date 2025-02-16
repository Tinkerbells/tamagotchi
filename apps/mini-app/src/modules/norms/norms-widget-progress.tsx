import { useMemo } from 'react'
import { cn } from '@tamagotchi/utils'
import { Button, Dialog, DialogTrigger } from '@tamagotchi/ui'

import { CircleProgress } from '@/shared'
import { getCurrentWaterValue } from '@/screens/water-screen/utils'

import { NormsDialog } from './norms-widget-dialog'
import { useNormsWidgetContext } from './norms-widget-context'

export function NormsProgress() {
  const { currentProgress, onProgressChange, dailyNorm, variant }
    = useNormsWidgetContext()

  const unit = variant === 'water' ? 'мл' : 'часов'

  const currentValueText = useMemo(
    () => `${getCurrentWaterValue(currentProgress, dailyNorm)} ${unit}`,
    [currentProgress, dailyNorm, unit],
  )

  const normText = useMemo(
    () => `Ваша норма: ${dailyNorm} ${unit}`,
    [dailyNorm, unit],
  )

  const buttonTextColor
    = variant === 'water' ? 'text-[#0bb5b5]' : 'text-[#B1556C]'

  return (
    <div className="relative flex h-[268px] w-[268px] items-center justify-center overflow-visible">
      <CircleProgress
        variant={variant}
        progress={currentProgress}
        onProgressChange={onProgressChange}
      />
      <ProgressInfo
        currentValueText={currentValueText}
        normText={normText}
        buttonTextColor={buttonTextColor}
      />
    </div>
  )
}

function ProgressInfo({
  currentValueText,
  normText,
  buttonTextColor,
}: {
  currentValueText: string
  normText: string
  buttonTextColor: string
}) {
  return (
    <div className="absolute flex flex-col items-center gap-3">
      <span className="font-vk text-sm text-black">Выпито:</span>
      <span className="font-vk text-[40px] font-semibold tracking-tighter">
        {currentValueText}
      </span>
      <span className="text-[10px]">
        {normText.split(':')[0]}
        :
        <b>{normText.split(':')[1]}</b>
      </span>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn(
              'h-[26px] rounded-full bg-white px-2 py-0.5 text-xs font-semibold',
              buttonTextColor,
            )}
          >
            Изменить
          </Button>
        </DialogTrigger>
        <NormsDialog />
      </Dialog>
    </div>
  )
}
