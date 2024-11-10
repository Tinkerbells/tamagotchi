import { StartScreen } from '../modules'
import { Panel } from '@vkontakte/vkui'
import { FC } from 'react'

interface OnboardingProps {
  id: string
}
export const Onboarding: FC<OnboardingProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <StartScreen />
    </Panel>
  )
}
