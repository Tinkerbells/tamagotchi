import { vkBridge } from '@/shared/lib'

export async function getAuthorizationParams() {
  const launchParams = await vkBridge.send('VKWebAppGetLaunchParams')
  return `VK ${btoa(JSON.stringify(launchParams).replace(/\n/g, ''))}`
}
