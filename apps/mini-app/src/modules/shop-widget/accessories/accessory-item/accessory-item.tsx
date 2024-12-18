import { ProductCard, ProductCardProps } from '../../product-card'
import { useUpdateAccessory } from '@/data'
import { useAuth } from '@/shared'
import { DialogTrigger } from '@tamagotchi/ui'
import * as React from 'react'

interface AccessoryItemProps extends ProductCardProps {
  itemId: number
}

//TODO add loading state
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
      // disabled={isPurchased}
      className="h-fit w-fit"
      onClick={(e) => {
        if (isPurchased) {
          e.preventDefault()
        }
        isPurchased &&
          updateAccessory({ itemId: itemId.toString(), userId: user.id })
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
