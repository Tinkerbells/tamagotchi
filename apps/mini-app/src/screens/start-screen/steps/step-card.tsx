import * as React from 'react'
import { cn } from '@tamagotchi/utils'

import { Image } from '@/shared'

import bg from '/images/start-screen/step-bg.webp'

type StepCardProps = React.HTMLAttributes<HTMLDivElement>

export const StepCard: React.FC<StepCardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-end justify-center overflow-y-hidden py-14',
        className,
      )}
      {...props}
    >
      <Image
        height={320}
        width={240}
        placeholder="skeleton"
        className="shadow-start-screen-card h-80 w-60 rounded-[1.5rem]"
        src={bg}
      />
      {children}
    </div>
  )
}
