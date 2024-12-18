import { CheckCircle, Gems } from '@/shared'
import { cn } from '@tamagotchi/utils'
import * as React from 'react'

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  price?: number
  isPurchased?: boolean
  isActive?: boolean
}
export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  isPurchased,
  isActive,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative h-[150px] w-[155px] overflow-hidden rounded-[19px] bg-white',
        className
      )}
    >
      {isPurchased ? (
        <CheckCircle
          className={cn(
            'absolute right-2 top-3 h-6 w-6',
            isActive ? 'text-[#ef9b7a]' : 'text-[#e1e4e7]'
          )}
        />
      ) : (
        price && <Gems count={price} className="absolute right-2 top-3" />
      )}
      {children}
      <p className="absolute bottom-4 w-full text-center text-sm font-medium">
        {title}
      </p>
    </div>
  )
}
