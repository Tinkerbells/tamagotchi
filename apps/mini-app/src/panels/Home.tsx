import { StartScreen } from '../modules'
import {
  Panel,
  NavIdProps,
} from '@vkontakte/vkui'
import * as React from 'react'

export interface HomeProps extends NavIdProps {
  // fetchedUser?: UserInfo;
}

export const Home: React.FC<HomeProps> = ({ id }) => {

  return (
    <Panel id={id}>
      <StartScreen />
    </Panel>
  )
}
