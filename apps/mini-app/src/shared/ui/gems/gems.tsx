import gem from '/images/gem/gem.webp'
import { Image } from '@/shared'
import { cn } from '@tamagotchi/utils'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'

export const gemsVariants = cva('flex gap-1 relative items-center', {
  variants: {
    size: {
      S: 'h-4 text-text-secondary fond-medium text-xs',
      L: 'h-6 text-[#523322] font-sfpro font-bold',
    },
    defaultVariants: {
      size: 'S',
    },
  },
})

interface GemsProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof gemsVariants> {
  count?: number
}

export const Gems: React.FC<GemsProps> = ({ count, size = 'S', className }) => {
  return (
    <div className={cn(gemsVariants({ size, className }))}>
      <Image
        placeholder="skeleton"
        src={gem}
        width={size === 'S' ? 16 : 24}
        height={size === 'S' ? 16 : 24}
      />
      <span className={cn(size === 'S' && 'mt-0.5')}>{count}</span>
    </div>
  )
}
