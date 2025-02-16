import type { InteriorType } from '@tamagotchi/api/hc'

import * as React from 'react'
import { Dialog } from '@tamagotchi/ui'

import type { InteriorItemsType } from '@/data'

import { Image } from '@/shared'
import { CreatePurchaseDialog } from '@/modules'

import { getInteriorItem } from './lib'
import { ProductCard } from '../product-card'
import { InteriorItem } from './interior-item'

interface InteriorItemsProps {
  data: InteriorItemsType
}

export const InteriorItems: React.FC<InteriorItemsProps> = ({ data }) => {
  const id = React.useId()
  return (
    <div>
      <p className="text-center text-base font-semibold">Предметы интерьера</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map(item => (
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
