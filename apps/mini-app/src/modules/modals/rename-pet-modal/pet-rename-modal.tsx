import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@tamagotchi/ui'

import { PetRenameForm } from '@/modules/forms'

export function PetRenameDialog() {
  return (
    <DialogContent className="max-w-[90%]">
      <DialogHeader>
        <DialogTitle>Введите имя:</DialogTitle>
        <DialogDescription>Как переименовать вашего питомца?</DialogDescription>
      </DialogHeader>
      <PetRenameForm />
    </DialogContent>
  )
}
