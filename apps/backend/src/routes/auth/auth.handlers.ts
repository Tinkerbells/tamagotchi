import type { VkAuthRoute } from './auth.routes'
import type { VkAuthParams } from './auth.schema'
import env from '@/env'
import type { AppRouteHandler } from '@/lib/types'
import crypto from 'crypto'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

export const vkAuth: AppRouteHandler<VkAuthRoute> = async (c) => {
  const { sign } = c.req.valid('json')
  const isValid = validateAuthParams(sign)

  if (!isValid) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED
    )
  }

  const tokens = {
    accessToken: '',
    refreshToken: '',
  }

  return c.json(tokens, HttpStatusCodes.OK)
}

export const validateAuthParams = (params: VkAuthParams) => {
  const { sign, ...rest } = params

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
