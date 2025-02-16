import * as React from 'react'

import { WaterDrop } from '@/shared'
import { routes } from '@/app/routes'

import type { ResourceWidgetValue } from './types'

import { ResourceWidget } from './widget'

export const WaterWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      link={routes.water}
      value={value}
      icon={<WaterDrop className="text-[#52a1c6]" />}
      label="Вода"
      colors={['#98c4c7', '#e9fdfe', '#c3f9fc']}
    />
  )
}
