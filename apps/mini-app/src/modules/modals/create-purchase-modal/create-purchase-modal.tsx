import {
  useCreatePurchase,
  useUpdateAccessory,
  useUpdateInteriorItem,
} from '@/data'
import { Gems, useAuth, useConfetti } from '@/shared'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  Button,
  DialogClose,
} from '@tamagotchi/ui'
import { useToggle } from '@uidotdev/usehooks'
import * as React from 'react'
import { PropsWithChildren } from 'react'

interface CreatePurchaseDialogProps extends PropsWithChildren {
  price: number
  itemId: number
  itemType: 'accessory' | 'interior'
}

export const CreatePurchaseDialog: React.FC<CreatePurchaseDialogProps> = ({
  price,
  itemId,
  itemType,
  children,
}) => {
  const { user } = useAuth()
  const [isPurchased, setPurchased] = useToggle(false)
  const confetti = useConfetti()
  const closeRef = React.useRef<HTMLButtonElement>(null)

  const { mutate: updateAccessory, isPending: accessoryPending } =
    useUpdateAccessory({
      onSuccess: () => {
        closeRef.current?.click()
      },
    })

  const { mutate: updateInteriorItem, isPending: interiorItemPending } =
    useUpdateInteriorItem({
      onSuccess: () => {
        closeRef.current?.click()
      },
    })

  const { mutate: createPurchase, isPending: purchasePending } =
    useCreatePurchase({
      onSuccess: () => {
        setPurchased(true)
        confetti()
      },
    })

  const isLoading = purchasePending || accessoryPending || interiorItemPending

  const handleClick = () => {
    const itemData = {
      userId: user.id,
      itemId: itemId.toString(),
      itemType: itemType,
    }

    if (isPurchased) {
      if (itemType === 'accessory') {
        updateAccessory({ itemId: itemId.toString(), userId: user.id })
      }
      if (itemType === 'interior') {
        updateInteriorItem({ itemId: itemId.toString(), userId: user.id })
      }
    } else {
      createPurchase(itemData)
    }
  }

  return (
    <DialogContent className="max-w-[90%]" withClose={false}>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          {isPurchased ? '🎉 Успешная покупка' : 'Готовы купить?'}
        </DialogTitle>
        <DialogDescription>
          Если вам всё подходит, подтвердите вашу покупку.
        </DialogDescription>
      </DialogHeader>
      {children}
      <Button
        className="flex gap-2 text-base font-medium"
        onClick={handleClick}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isPurchased ? (
          'Применить покупку'
        ) : (
          <>
            Купить за
            <Gems
              size={'L'}
              className="text-primary flex-row-reverse text-base font-normal"
              count={price}
            />
          </>
        )}
      </Button>
      <DialogClose className="w-full" asChild ref={closeRef}>
        <Button variant={'outline'}>
          {isPurchased ? 'Закрыть' : 'Отменить'}
        </Button>
      </DialogClose>
    </DialogContent>
  )
}
