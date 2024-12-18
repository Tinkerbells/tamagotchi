import { ProductCard, ProductCardProps } from '../../product-card'
import { useUpdateInteriorItem } from '@/data'
import { useAuth } from '@/shared'
import { DialogTrigger } from '@tamagotchi/ui'
import * as React from 'react'

interface AccessoryItemProps extends ProductCardProps {
  itemId: number
}

//TODO add loading state
export const InteriorItem: React.FC<AccessoryItemProps> = ({
  itemId,
  isPurchased,
  isActive,
  title,
  price,
  children,
}) => {
  const { user } = useAuth()
  const { mutate: updateInteriorItem, isPending } = useUpdateInteriorItem()
  return (
    <DialogTrigger
      // disabled={isPurchased}
      className="h-fit w-fit"
      onClick={(e) => {
        if (isPurchased) {
          e.preventDefault()
        }
        isPurchased &&
          updateInteriorItem({ itemId: itemId.toString(), userId: user.id })
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
