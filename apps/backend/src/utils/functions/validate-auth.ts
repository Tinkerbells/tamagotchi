// import { GetLaunchParamsResponse } from '@vkontakte/vk-bridge'
import crypto from 'crypto'

export const validateAuth = (
  // params: GetLaunchParamsResponse,
  validate: string
) => {
  // const { sign, ...rest } = params
  // // Sort keys in ascending order
  // const sortedParams = Object.keys(rest)
  //   .sort()
  //   .map((key) => {
  //     const value = rest[key as keyof typeof rest]
  //     return `${key}=${encodeURIComponent(value!)}`
  //   })
  //   .join('&')
  //
  // console.log('Params: ', sortedParams)
  //
  // const hash = crypto
  //   .createHmac('sha256', 'ZON7hTBZiO0St7rTZjgp')
  //   .update(sortedParams)
  //   .digest('base64')
  //   .replace(/\+/g, '-')
  //   .replace(/\//g, '_')
  //   .replace(/=$/, '')
  //
  // return hash
}
