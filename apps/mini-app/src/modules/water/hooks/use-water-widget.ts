import { getFormatToday } from '@/shared'

export const useWaterWidget = () => {
  const today = getFormatToday()
  return { today }
}
