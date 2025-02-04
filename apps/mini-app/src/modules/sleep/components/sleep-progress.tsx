import { CircleProgress, CircleProgressProps } from '@/shared'
import { Button } from '@tamagotchi/ui'
import * as React from 'react'

type SleepProgressProps = Omit<
  CircleProgressProps,
  'type' | 'onProgressChange'
> & {
  currentValue: number
  dailyNorm: number
}

export const SleepProgress = ({
  currentValue,
  dailyNorm,
}: SleepProgressProps) => {
  const [progress, setProgress] = React.useState(50)
  return (
    <div className="flex h-[268px] w-[268px] items-center justify-center overflow-visible">
      <CircleProgress
        variant="sleep"
        progress={progress}
        onProgressChange={setProgress}
      />
      <div className="absolute flex flex-col items-center gap-3">
        <span className="font-vk text-sm text-black">Выпито:</span>
        <span className="font-vk text-[40px] font-semibold">
          {getCurrentValue(progress, dailyNorm)}мл
        </span>
        <span className="text-[10px]">
          Ваша норма: <b>{dailyNorm}мл</b>
        </span>
        <Button className="h-[26px] rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#b1556c]">
          Изменить
        </Button>
      </div>
    </div>
  )
}

const getCurrentValue = (progress: number, dailyNorm: number) => {
  return Math.floor((progress * dailyNorm) / 100)
}
