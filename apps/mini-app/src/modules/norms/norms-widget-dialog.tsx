import { useNormsWidgetContext } from './norms-widget-context'
import { NormsWidgetForm } from './norms-widget-form'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@tamagotchi/ui'

export const NormsDialog = () => {
  const { variant } = useNormsWidgetContext()
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Дневная норма {variant === 'water' ? 'воды' : 'сна'}:
        </DialogTitle>
        <DialogDescription>
          {variant === 'water'
            ? 'Гидратация помогает коже, энергии и вниманию!'
            : 'Сон помогает восстановиться и быть продуктивным!'}
        </DialogDescription>
      </DialogHeader>
      <NormsWidgetForm />
    </DialogContent>
  )
}
