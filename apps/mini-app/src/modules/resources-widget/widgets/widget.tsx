import { cn } from '@tamagotchi/utils'
import * as React from 'react'

type HexColor = `#${string}`

export interface ResourceWidgetProps {
  icon: React.ReactNode
  value: number
  label: string
  colors: [HexColor, HexColor, HexColor]
}

export const ResourceWidget: React.FC<ResourceWidgetProps> = ({
  icon,
  value,
  label,
  colors,
}) => {
  const primaryColor = colors[0]
  const bgColor = colors[1]
  const bgFillColor = colors[2]
  const fillValue = `${value}%`
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={cn(
          'relative z-10 flex h-10 w-[68px] items-center justify-center overflow-hidden rounded-[17px]'
        )}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <span
          className={cn('absolute left-0 -z-10 h-full')}
          style={{
            backgroundColor: bgFillColor,
            width: fillValue,
          }}
        />
        {icon}
      </div>
      <span
        className={cn('mt-2 text-[12px] font-medium')}
        style={{ color: primaryColor }}
      >
        {label}
      </span>
    </div>
  )
}
