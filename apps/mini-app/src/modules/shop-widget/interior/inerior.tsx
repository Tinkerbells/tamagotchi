import { ProductCard } from '../product-card'
import { InteriorItem } from './interior-item'
import { getInteriorItem } from './lib'
import { InteriorItemsType } from '@/data'
import { CreatePurchaseDialog } from '@/modules'
import { Image } from '@/shared'
import { InteriorType } from '@tamagotchi/api/hc'
import { Dialog } from '@tamagotchi/ui'
import * as React from 'react'

interface InteriorItemsProps {
  data: InteriorItemsType
}

export const InteriorItems: React.FC<InteriorItemsProps> = ({ data }) => {
  const id = React.useId()
  return (
    <div>
      <p className="text-center text-base font-semibold">Предметы интерьера</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((item) => (
          <Dialog key={`${id}-${item.id}`}>
            <InteriorItem
              itemId={item.id}
              title={item.title}
              price={item.price}
              isActive={item.isActive}
              isPurchased={item.isPurchased}
            >
              <Image
                placeholder="skeleton"
                src={getInteriorItem(item.type as InteriorType)}
                width={224}
                height={298}
              />
            </InteriorItem>
            <CreatePurchaseDialog
              price={item.price}
              itemType="interior"
              itemId={item.id}
            >
              <ProductCard
                title={item.title}
                className="border-custom-border mx-auto border-[1px]"
              >
                <Image
                  placeholder="skeleton"
                  src={getInteriorItem(item.type as InteriorType)}
                  width={224}
                  height={298}
                />
              </ProductCard>
            </CreatePurchaseDialog>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
