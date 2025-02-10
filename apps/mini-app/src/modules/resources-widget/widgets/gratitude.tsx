import { routes } from '@/app/routes'
import { ResourceWidgetValue } from './types'
import { ResourceWidget } from './widget'
import { Heart } from '@/shared'
import * as React from 'react'

export const GratitudeWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      link={routes.gratitude}
      value={value}
      icon={<Heart className="text-[#c69d52]" />}
      label="Благодарность"
      colors={['#c7b398', '#fef8e9', '#fceec3']}
    />
  )
}
