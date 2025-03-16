import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { DEFAULT_MEDITATION_TIME } from '@/screens/meditation-screen/hooks/use-meditation-timer'

import type { FetchedStatistics } from '../dto'

dayjs.extend(duration)

export function convertStatistics(statistics: FetchedStatistics) {
  // Calculate total meditation time in minutes
  const totalMinutes = statistics.meditation * DEFAULT_MEDITATION_TIME

  if (totalMinutes < 60) {
    return {
      ...statistics,
      meditation: `${totalMinutes} минут${totalMinutes === 15 ? '' : 'ы'}`, // Handle singular/plural
    }
  }

  // Convert to decimal hours
  const totalHours = totalMinutes / 60

  return {
    ...statistics,
    meditation: `${totalHours.toFixed(1)} ${totalHours === 1 ? 'час' : 'часа'}`,
  }
}
