import { getLowestResources, getPetMood } from './lib'
import { FetchedResources } from '@/data'
import { useMoodStore } from '@/modules/resources-widget/store'
import * as React from 'react'

interface PetStatusTextProps {
  petName: string
  resources: FetchedResources
}

export const PetStatusText: React.FC<PetStatusTextProps> = ({
  petName,
  resources,
}) => {
  const { mood } = useMoodStore()
  const lowestResources = getLowestResources(resources)
  return (
    <div className="w-[331px]">
      <h2 className="text-center text-xl font-bold">
        {petName} {getPetMood(mood)}
      </h2>
      <p className="text-text-secondary mt-2 text-center">
        Вы давно не{' '}
        <span className="text-text-highlight underline">
          {lowestResources[0]}
        </span>{' '}
        и не{' '}
        <span className="text-text-highlight underline">
          {lowestResources[1]}
        </span>{' '}
        с вашим питомцем.. Возможно сейчас самое время?
      </p>
    </div>
  )
}
