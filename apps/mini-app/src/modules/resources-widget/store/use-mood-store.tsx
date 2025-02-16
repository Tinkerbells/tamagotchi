import { create } from 'zustand'

import type { MoodType } from '@/data'

interface MoodStore {
  mood: MoodType | null
  setMood: (mood: MoodType) => void
}

export const useMoodStore = create<MoodStore>(set => ({
  mood: null,
  setMood: mood => set({ mood }),
}))
