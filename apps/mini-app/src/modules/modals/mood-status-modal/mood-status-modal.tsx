import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@tamagotchi/ui'

import { SelectMoodForm } from '@/modules/forms'

export function MoodStatusDialog() {
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
