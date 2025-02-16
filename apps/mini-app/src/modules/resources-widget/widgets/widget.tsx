import type { To } from 'react-router-dom'

import * as React from 'react'
import { cn } from '@tamagotchi/utils'
import { Link } from 'react-router-dom'

type HexColor = `#${string}`

export interface ResourceWidgetProps {
  icon: React.ReactNode
  value: number
  label: string
  colors: [HexColor, HexColor, HexColor]
  link?: To
}

export const ResourceWidget: React.FC<ResourceWidgetProps> = ({
  link,
  icon,
  value,
  label,
  colors,
}) => {
  const primaryColor = colors[0]
  const bgColor = colors[1]
  const bgFillColor = colors[2]
  const fillValue = `${value}%`
  // TODO add link for all resources widgets
  return (
    <Link to={link || ''} className="flex w-full flex-col items-center">
      <div
        className={cn(
          'relative z-10 flex h-10 w-[68px] items-center justify-center overflow-hidden rounded-[17px]',
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
    </Link>
  )
}
