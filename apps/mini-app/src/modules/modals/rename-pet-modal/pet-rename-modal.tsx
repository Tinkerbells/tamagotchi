import { PetRenameForm } from '@/modules/forms'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from '@tamagotchi/ui'

export const PetRenameDialog = () => {
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
