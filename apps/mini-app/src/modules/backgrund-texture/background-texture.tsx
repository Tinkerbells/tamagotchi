import {
  Bored,
  DefaultBackground,
  Happy,
  HighlightBackground,
  VeryBored,
  VeryHappy,
  WaterBackground,
} from './textures'
import { MoodType } from '@/data'
import * as React from 'react'

export interface BackgroundTextureProps {
  variant?: MoodType | 'highlight' | 'water'
}

export const BackgroundTexture: React.FC<BackgroundTextureProps> = ({
  variant,
}) => {
  switch (variant) {
    case 'very_bored':
      return <VeryBored />
    case 'bored':
      return <Bored />
    case 'happy':
      return <Happy />
    case 'very_happy':
      return <VeryHappy />
    case 'highlight':
      return <HighlightBackground />
    case 'water':
      return <WaterBackground />
    default:
      return <DefaultBackground />
  }
}
