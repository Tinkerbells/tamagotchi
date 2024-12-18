import { ProductCard } from '../product-card'
import { AccessoryItem } from './accessory-item'
import { getHat } from './lib'
import { AccessoriesType } from '@/data'
import { CreatePurchaseModal } from '@/modules'
import { Image } from '@/shared'
import { AccessoryType } from '@tamagotchi/api/hc'
import { Dialog } from '@tamagotchi/ui'
import * as React from 'react'

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
        {data.map((item) => (
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
            <CreatePurchaseModal
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
            </CreatePurchaseModal>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
