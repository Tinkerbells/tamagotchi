import { MoodType } from '@/data'
import { create } from 'zustand'

type MoodStore = {
  mood: MoodType | null
  setMood: (mood: MoodType) => void
}

export const useMoodStore = create<MoodStore>((set) => ({
  mood: null,
  setMood: (mood) => set({ mood }),
}))
