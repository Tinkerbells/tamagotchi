import { ResourceWidgetValue } from './types'
import { ResourceWidget } from './widget'
import { Walking } from '@/shared'
import * as React from 'react'

export const WalkingWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      value={value}
      icon={<Walking className="text-[#c67d52]" />}
      label="Прогулка"
      colors={['#c7ae98', '#fef8e9', '#fcdec3']}
    />
  )
}
