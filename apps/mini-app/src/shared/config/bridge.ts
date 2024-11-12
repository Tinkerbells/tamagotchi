import { env } from './env'
import bridge from '@vkontakte/vk-bridge'
import bridgeMock from '@vkontakte/vk-bridge-mock'

export const vkBridge = env.NODE_ENV === 'production' ? bridge : bridgeMock
