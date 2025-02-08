import { sleep } from '@tamagotchi/api/hc'

export type SleepType = Omit<
  typeof sleep.$inferSelect,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}

export type FetchedSleep = SleepType[]

export type UpdateSleepDto = {
  currentValue: SleepType['currentValue']
}
