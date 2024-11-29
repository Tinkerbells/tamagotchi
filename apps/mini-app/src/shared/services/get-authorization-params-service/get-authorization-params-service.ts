import { vkBridge } from '@/shared/lib'

export const getAuthorizationParams = async () => {
  const launchParams = await vkBridge.send('VKWebAppGetLaunchParams')
  return 'VK ' + btoa(JSON.stringify(launchParams).replace(/\n/g, ''))
}
