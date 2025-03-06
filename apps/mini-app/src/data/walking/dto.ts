import type { walking } from '@tamagotchi/api/hc'

export type WalkingType = Omit<
  typeof walking.$inferSelect,
  'createdAt' | 'updatedAt' | 'date'
> & {
  createdAt: string
  updatedAt: string
  date: string
}

export type WalkingId = number
export type FetchedWalkings = WalkingType[]

export interface CreateWalkingParams {
  userId: number
  currentValue: number
  date: string
  finished: boolean
}

export interface WalkingProgressType {
  date: string
  currentValue: number
  finished: boolean
}

// Convert date objects to strings for the API
export function convertWalkingForAPI(walking: CreateWalkingParams): CreateWalkingParams {
  return {
    ...walking,
    date: walking.date || new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
  }
}

export interface GeoPosition {
  lat: number
  long: number
  accuracy: number
  available: boolean
  timestamp: number
}

export interface WalkingStats {
  totalDistance: number // in kilometers
  todayDistance: number // in kilometers
  lastPosition: GeoPosition | null
  positions: GeoPosition[]
  isWalking: boolean
}
