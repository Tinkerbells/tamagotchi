import { vkBridge } from '@/shared'
import { useMutation, MutationOptions } from '@tanstack/react-query'

export const showAd = async () => {
  try {
    // @ts-ignore
    const response = await vkBridge.send('VKWebAppShowNativeAds', { ad_format: "reward" })
    if (!response.result) {
      const error = new Error('Ошибка при показе рекламы')
      error.name = 'ShowAdError'
      throw error
    }
    console.log('Реклама показана')
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

// export const useShowAd = (
//   options?: Omit<
//     MutationOptions<unknown, Error, unknown, unknown>,
//     'mutationFn' | 'onSuccess'
//   >
// ) => {
//   return useMutation({
//     mutationFn: () => showAd(),
//     ...options,
//   })
// }
//
