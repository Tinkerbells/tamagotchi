import bridge from '@vkontakte/vk-bridge'
import bridgeMock from '@vkontakte/vk-bridge-mock'

import { env } from '@/shared/config'

export const vkBridge = env.NODE_ENV === 'production' ? bridge : bridgeMock
// export const vkBridge = bridge
