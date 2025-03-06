import type { WalkingProgressType, WalkingType } from '../dto'

export function parseWalkings(walkings: WalkingType[]): WalkingProgressType[] {
  return walkings.map(walking => ({
    date: walking.date,
    currentValue: walking.currentValue,
    finished: Boolean(walking.finished),
  }))
}
