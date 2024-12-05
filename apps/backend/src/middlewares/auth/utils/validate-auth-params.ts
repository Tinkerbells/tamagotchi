import { type LaunchParamsDto } from '../dto'
import env from '@/env'
import crypto from 'crypto'

const ONE_HOUR_IN_SECONDS = 3600

export const validateAuthParams = (authorization: string): boolean => {
  const params = atob(authorization.replace('VK ', ''))
  const paramsObj = JSON.parse(params) as LaunchParamsDto
  const { sign, ...rest } = paramsObj
  const vkTs = rest.vk_ts

  // Check if params are fresh
  if (!areParamsFresh(vkTs)) {
    return false
  }
  const sortedParams = Object.keys(rest)
    .sort()
    .map((key) => {
      const value = rest[key as keyof typeof rest]
      return `${key}=${encodeURIComponent(value!)}`
    })
    .join('&')

  const hash = crypto
    .createHmac('sha256', env.SECRET_KEY)
    .update(sortedParams)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '')

  return hash === sign
}

const areParamsFresh = (vkTs: number): boolean => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000)
  return currentTimeInSeconds - vkTs <= ONE_HOUR_IN_SECONDS
}
