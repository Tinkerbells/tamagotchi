import { ConvertedStatistics, FetchedStatistics } from '../dto'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const convertStatistics = (statistics: FetchedStatistics) => {
  // Calculate total meditation time in minutes
  const totalMinutes = statistics.meditation * 15

  // Create a dayjs duration object
  const meditationDuration = dayjs.duration(totalMinutes, 'minutes')

  // Extract hours and remaining minutes
  const hours = meditationDuration.hours()
  const minutes = meditationDuration.minutes()

  // Helper function to handle Russian pluralization
  const pluralize = (
    number: number,
    one: string,
    few: string,
    many: string
  ): string => {
    if (number % 10 === 1 && number % 100 !== 11) {
      return `${number} ${one}`
    } else if (
      [2, 3, 4].includes(number % 10) &&
      ![12, 13, 14].includes(number % 100)
    ) {
      return `${number} ${few}`
    } else {
      return `${number} ${many}`
    }
  }

  // Build the result string
  let result = ''

  if (hours > 0) {
    result += pluralize(hours, 'час', 'часа', 'часов') + ' '
  }

  if (minutes > 0) {
    result += pluralize(minutes, 'минута', 'минуты', 'минут')
  }

  // If no hours or minutes, return "0 минут"
  if (hours === 0 && minutes === 0) {
    result = '0 минут'
  }

  return {
    ...statistics,
    meditation: result,
  }
}
