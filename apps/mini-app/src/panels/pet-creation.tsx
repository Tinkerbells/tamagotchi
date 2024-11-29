import { PetCreationScreen } from '@/modules/screens'
import { NavIdProps, Panel } from '@vkontakte/vkui'
import { FC } from 'react'

export const PetCreation: FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PetCreationScreen />
    </Panel>
  )
}
