import { ResourceWidgetValue } from './types'
import { ResourceWidget } from './widget'
import { Food } from '@/shared'
import * as React from 'react'

export const MealWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      value={value}
      icon={<Food className="text-[#c66e52]" />}
      label="Питание"
      colors={['#c7a698', '#fef1e9', '#fcd1c3']}
    />
  )
}
