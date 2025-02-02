import { ResourcesPanelSkeleton } from './resources-panel-skeleton'
import { Food, Heart, Meditation, Sleep, Walking, WaterDrop } from '@/shared'
import { ArrowBack, Button } from '@tamagotchi/ui'
import { cn } from '@tamagotchi/utils'
import { useNavigate } from 'react-router-dom'

const styles = {
  water: {
    backButtonBg: 'bg-[#e9fafe]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#0bb5b5]',
  },
  food: {
    backButtonBg: 'bg-[#e9fafe]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#0bb5b5]',
  },
  sleep: {
    backButtonBg: 'bg-[#e9fafe]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#0bb5b5]',
  },
  meditation: {
    backButtonBg: 'bg-[#e9fafe]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#0bb5b5]',
  },
  gratitude: {
    backButtonBg: 'bg-[#e9fafe]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#0bb5b5]',
  },
  walking: {
    backButtonBg: 'bg-[#e9fafe]',
    buttonBg: 'bg-[#c3f9fc]',
    primary: 'text-[#0bb5b5]',
  },
}

const icons = {
  water: <WaterDrop className="h-full w-full text-[#ebfdfe]" />,
  food: <Food className="h-[100px] w-[100px] text-[#D9D9D9]" />,
  sleep: <Sleep className="h-[100px] w-[100px] text-[#D9D9D9]" />,
  meditation: <Meditation className="h-[100px] w-[100px] text-[#D9D9D9]" />,
  gratitude: <Heart className="h-[100px] w-[100px] text-[#D9D9D9]" />,
  walking: <Walking className="h-[100px] w-[100px] text-[#D9D9D9]" />,
}

export interface ResourcesPanelProps {
  isLoading?: boolean
  title: string
  description: string
  variant: 'food' | 'water' | 'sleep' | 'meditation' | 'gratitude' | 'walking'
}

export const ResourcesPanel = ({
  isLoading,
  variant,
  title,
  description,
}: ResourcesPanelProps) => {
  const { backButtonBg, buttonBg, primary } = styles[variant]
  const icon = icons[variant]

  const navigate = useNavigate()

  return (
    <section className="absolute bottom-0 flex min-h-[210px] w-full flex-col items-center justify-center px-4 py-6">
      {isLoading ? (
        <ResourcesPanelSkeleton />
      ) : (
        <>
          <div className="relative flex flex-col justify-center gap-3 py-14">
            <span className="font-vk text-xl font-semibold text-black">
              {title}
            </span>
            <span className="font-vk text-text-secondary text-[15px] font-normal leading-[18px]">
              {description}
            </span>
            <div className="absolute right-0 top-0 -z-10 -mr-4 h-[100px] w-[100px] p-2">
              {icon}
            </div>
          </div>
          <div className="flex w-full gap-2">
            <Button
              className={cn(
                'aspect-square h-[44px] w-[44px] rounded-[17px] p-0',
                backButtonBg,
                primary
              )}
              onClick={() => navigate(-1)}
            >
              <ArrowBack />
            </Button>
            <Button className={cn('h-[44px] w-full', buttonBg, primary)}>
              Сохранить
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
