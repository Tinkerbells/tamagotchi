import type { AccessoryType } from '@tamagotchi/api/hc'

import * as React from 'react'
import { Dialog } from '@tamagotchi/ui'

import type { AccessoriesType } from '@/data'

import { Image } from '@/shared'
import { CreatePurchaseDialog } from '@/modules'

import { getHat } from './lib'
import { ProductCard } from '../product-card'
import { AccessoryItem } from './accessory-item'

interface AccessoriesProps {
  data: AccessoriesType
}

export const Accessories: React.FC<AccessoriesProps> = ({ data }) => {
  const id = React.useId()
  return (
    <div>
      <p className="text-center text-base font-semibold">
        Аксессуары на питомца
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map(item => (
          <Dialog key={`${id}-${item.id}`}>
            <AccessoryItem
              itemId={item.id}
              title={item.title}
              price={item.price}
              isActive={item.isActive}
              isPurchased={item.isPurchased}
            >
              <Image
                placeholder="skeleton"
                src={getHat(item.type as AccessoryType)}
                width={224}
                height={298}
              />
            </AccessoryItem>
            <CreatePurchaseDialog
              price={item.price}
              itemType="accessory"
              itemId={item.id}
            >
              <ProductCard
                title={item.title}
                className="border-custom-border mx-auto border-[1px]"
              >
                <Image
                  placeholder="skeleton"
                  src={getHat(item.type as AccessoryType)}
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
