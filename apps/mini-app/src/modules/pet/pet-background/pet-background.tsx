import * as React from 'react'

import type { MoodType } from '../pet-status-text'

import { Bored, Happy, VeryBored, VeryHappy } from './textures'

interface PetBackgroundProps {
  petMood: MoodType
}

export const PetBackground: React.FC<PetBackgroundProps> = ({ petMood }) => {
  switch (petMood) {
    case 'very_bored':
      return <VeryBored />
    case 'bored':
      return <Bored />
    case 'happy':
      return <Happy />
    case 'very_happy':
      return <VeryHappy />
    default:
      return <Bored />
  }
}
