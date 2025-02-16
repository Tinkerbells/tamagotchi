import * as React from 'react'

import { Food } from '@/shared'
import { routes } from '@/app/routes'

import type { ResourceWidgetValue } from './types'

import { ResourceWidget } from './widget'

export const MealWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      link={routes.meals}
      value={value}
      icon={<Food className="text-[#c66e52]" />}
      label="Питание"
      colors={['#c7a698', '#fef1e9', '#fcd1c3']}
    />
  )
}
