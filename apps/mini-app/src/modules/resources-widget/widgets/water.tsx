import { ResourceWidgetValue } from './types'
import { ResourceWidget } from './widget'
import { WaterDrop } from '@/shared'
import * as React from 'react'

export const WaterWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      value={value}
      icon={<WaterDrop className="text-[#52a1c6]" />}
      label="Вода"
      colors={['#98c4c7', '#e9fdfe', '#c3f9fc']}
    />
  )
}
