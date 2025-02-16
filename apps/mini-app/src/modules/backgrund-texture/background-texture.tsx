import * as React from 'react'

import type { MoodType } from '@/data'

import { Shadows } from './shadows'
import {
  Bored,
  DefaultBackground,
  Happy,
  HighlightBackground,
  MeditationBackground,
  SleepBackground,
  VeryBored,
  VeryHappy,
  WaterBackground,
} from './textures'

export interface BackgroundTextureProps {
  variant?: MoodType | 'highlight' | 'water' | 'sleep' | 'meditation'
}

export const BackgroundTexture: React.FC<BackgroundTextureProps> = ({
  variant,
}) => {
  switch (variant) {
    case 'very_bored':
      return (
        <>
          <VeryBored />
          <Shadows />
        </>
      )
    case 'bored':
      return (
        <>
          <Bored />
          <Shadows />
        </>
      )
    case 'happy':
      return (
        <>
          <Happy />
          <Shadows />
        </>
      )
    case 'very_happy':
      return (
        <>
          <VeryHappy />
          <Shadows />
        </>
      )
    case 'highlight':
      return <HighlightBackground />
    case 'water':
      return <WaterBackground />
    case 'sleep':
      return <SleepBackground />
    case 'meditation':
      return <MeditationBackground />
    default:
      return <DefaultBackground />
  }
}
