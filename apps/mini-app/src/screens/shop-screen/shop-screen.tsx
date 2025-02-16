import { useState } from 'react'

import { useAuth } from '@/shared'
import { ShopWidget } from '@/modules'

import { WithNavbarScreen } from '../screen'

export function ShopScreen() {
  const { user } = useAuth()
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  return (
    <WithNavbarScreen texture="highlight" isVisible={isNavbarVisible}>
      <ShopWidget userId={user.id} onScrollChange={setIsNavbarVisible} />
    </WithNavbarScreen>
  )
}
