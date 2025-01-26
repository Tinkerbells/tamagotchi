import {
  Bored,
  DefaultBackground,
  Happy,
  HighlightBackground,
  VeryBored,
  VeryHappy,
} from './textures'
import { MoodType } from '@/data'
import * as React from 'react'

interface BackgroundTextureProps {
  variant?: MoodType | 'highlight'
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
    default:
      return <DefaultBackground />
  }
}
