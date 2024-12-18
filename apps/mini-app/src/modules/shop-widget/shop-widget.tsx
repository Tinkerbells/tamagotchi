import { Accessories, AccessoriesPlaceholder } from './accessories'
import { InteriorItems, InteriorItemsPlaceholder } from './interior'
import { useGetShop, UserId } from '@/data'
import * as React from 'react'

interface ShopProps {
  userId: UserId
}

export const ShopWidget: React.FC<ShopProps> = ({ userId }) => {
  const { data: shop, isLoading } = useGetShop({ userId: userId.toString() })

  return (
    <div className="mb-16 mt-32">
      {!shop || isLoading ? (
        <>
          <AccessoriesPlaceholder />
          <InteriorItemsPlaceholder />
        </>
      ) : (
        <div className="flex flex-col gap-8">
          <Accessories data={shop.accessories} />
          <InteriorItems data={shop.interior_items} />
        </div>
      )}
    </div>
  )
}
