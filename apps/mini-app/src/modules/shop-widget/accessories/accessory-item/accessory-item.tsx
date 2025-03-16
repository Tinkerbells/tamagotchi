import * as React from 'react'
import toast from 'react-hot-toast'
import { DialogTrigger } from '@tamagotchi/ui'

import { useAuth } from '@/shared'
import { useUpdateAccessory } from '@/data'

import type { ProductCardProps } from '../../product-card'

import { ProductCard } from '../../product-card'

interface AccessoryItemProps extends ProductCardProps {
  itemId: number
}

// TODO add loading state
export const AccessoryItem: React.FC<AccessoryItemProps> = ({
  itemId,
  isPurchased,
  isActive,
  title,
  price,
  children,
}) => {
  const { user } = useAuth()
  const { mutate: updateAccessory, isPending } = useUpdateAccessory()
  return (
    <DialogTrigger
      className="h-fit w-fit"
      onClick={(e) => {
        if (isPurchased || user.gems < price) {
          e.preventDefault()
        }
        isPurchased
        && updateAccessory({ itemId: itemId.toString(), userId: user.id })
      }}
    >
      <ProductCard
        isPurchased={isPurchased}
        isActive={isActive}
        title={title}
        price={price}
      >
        {children}
      </ProductCard>
    </DialogTrigger>
  )
}
