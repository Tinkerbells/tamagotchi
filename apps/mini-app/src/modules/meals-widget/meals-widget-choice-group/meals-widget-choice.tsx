import * as React from 'react'
import { cn } from '@tamagotchi/utils'

import { CheckCircle } from '@/shared'

interface MealsWidgetChoiceProps extends React.ComponentProps<'div'> {
  onChoice: () => void
  isActive?: boolean
  title: string
}

export function MealsWidgetChoice({
  className,
  onChoice,
  isActive,
  title,
  children,
}: MealsWidgetChoiceProps) {
  return (
    <button
      className={cn(
        'relative flex h-[81px] w-[165px] justify-center overflow-visible rounded-lg transition-colors duration-300',
        isActive ? 'bg-[#fef1e9]' : 'bg-white',
        className,
      )}
      onClick={onChoice}
    >
      <div className="absolute -top-8">{children}</div>
      <span className="mt-8 flex items-center gap-2 text-sm font-semibold tracking-tighter">
        <CheckCircle
          className={cn(
            'h-3 w-3',
            isActive ? 'text-[#ef9b7a]' : 'text-[#e1e4e7]',
          )}
        />
        {title}
      </span>
    </button>
  )
}
