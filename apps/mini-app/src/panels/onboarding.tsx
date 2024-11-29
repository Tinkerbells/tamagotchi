import { StartScreen } from '@/modules/screens'
import { UserInfo } from '@vkontakte/vk-bridge'
import { Panel } from '@vkontakte/vkui'
import { FC, useEffect } from 'react'

interface OnboardingProps {
  id: string
  user?: UserInfo
}
export const Onboarding: FC<OnboardingProps> = ({ id, user }) => {
  useEffect(() => {
    // const createUser = async () => {
    //   const createdUser = await client.user[':id'].$get({
    //     param: { id: user.id.toString() },
    //   })
    //   if (createdUser) {
    //     return createdUser
    //   } else {
    //     const createdUser = await client.user.$get({
    //       json: {
    //         vkId: user.id.toString(),
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //       },
    //     })
    //     return createdUser
    //   }
    // }
    // if (user) {
    //   createUser()
    // }
  })
  return (
    <Panel id={id}>
      <StartScreen />
    </Panel>
  )
}
