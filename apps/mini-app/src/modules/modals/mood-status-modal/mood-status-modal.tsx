import { SelectMoodForm } from '@/modules/forms'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from '@tamagotchi/ui'

export const MoodStatusDialog = () => {
  return (
    <DialogContent className="max-w-[90%]" withClose={false}>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Как у вас настроение?
        </DialogTitle>
        <DialogDescription className="max-w-[75%]">
          Оцените как вы себя чувствуете на данный момент
        </DialogDescription>
      </DialogHeader>
      <SelectMoodForm />
    </DialogContent>
  )
}
