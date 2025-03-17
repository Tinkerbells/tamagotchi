import * as React from 'react'
import { Link } from 'react-router-dom'

import type { FetchedResources } from '@/data'

import { useMoodStore } from '@/modules/resources-widget/store'

import { getPetMood } from './lib'

// Threshold to determine if a resource is "in norm"
const RESOURCE_NORM_THRESHOLD = 50

// Define action texts for each resource
const resourceActions: Record<keyof FetchedResources, string> = {
  meal: 'принимали пищу',
  water: 'пили воду',
  meditation: 'медитировали',
  gratitude: 'писали благодарности',
  walking: 'гуляли',
  sleep: 'спали',
}

interface PetStatusTextProps {
  petName: string
  resources: FetchedResources
}

export const PetStatusText: React.FC<PetStatusTextProps> = ({
  petName,
  resources,
}) => {
  const { mood } = useMoodStore()

  // Identify resources below norm
  const belowNormResources = Object.entries(resources)
    .filter(([_, value]) => value < RESOURCE_NORM_THRESHOLD)
    .sort(([, a], [_, b]) => a - b) // Sort by value (lowest first)
    .map(([key]) => key as keyof FetchedResources)

  // If all resources are in norm, don't show anything
  if (belowNormResources.length === 0) {
    return null
  }

  // If only one resource is below norm, show only that one
  if (belowNormResources.length === 1) {
    const resourceKey = belowNormResources[0]
    return (
      <div className="w-[331px]">
        <h2 className="text-center text-xl font-bold">
          {petName}
          {' '}
          {mood && getPetMood(mood)}
        </h2>
        <p className="text-text-secondary mt-2 text-center">
          Вы давно не
          {' '}
          <Link to={`/${resourceKey}`} className="text-text-highlight underline">
            {resourceActions[resourceKey]}
          </Link>
          {' '}
          с вашим питомцем.. Возможно сейчас самое время?
        </p>
      </div>
    )
  }

  // If multiple resources are below norm, show the two lowest ones (original behavior)
  const lowestTwo = belowNormResources.slice(0, 2)

  return (
    <div className="w-[331px]">
      <h2 className="text-center text-xl font-bold">
        {petName}
        {' '}
        {mood && getPetMood(mood)}
      </h2>
      <p className="text-text-secondary mt-2 text-center">
        Вы давно не
        {' '}
        <Link to={`/${lowestTwo[0]}`} className="text-text-highlight underline">
          {resourceActions[lowestTwo[0]]}
        </Link>
        {' '}
        и не
        {' '}
        <Link to={`/${lowestTwo[1]}`} className="text-text-highlight underline">
          {resourceActions[lowestTwo[1]]}
        </Link>
        {' '}
        с вашим питомцем.. Возможно сейчас самое время?
      </p>
    </div>
  )
}
