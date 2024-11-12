import { StartScreen } from '../modules'
import { UserInfo } from '@vkontakte/vk-bridge'
import { Panel } from '@vkontakte/vkui'
import { FC } from 'react'

interface OnboardingProps {
  id: string
  user?: UserInfo
}
export const Onboarding: FC<OnboardingProps> = ({ id, user }) => {
  console.log(user)
  return (
    <Panel id={id}>
      <StartScreen />
    </Panel>
  )
}
