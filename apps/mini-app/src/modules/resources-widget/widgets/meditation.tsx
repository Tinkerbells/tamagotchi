import { ResourceWidgetValue } from './types'
import { ResourceWidget } from './widget'
import { Meditation } from '@/shared'
import * as React from 'react'

export const MeditationWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      value={value}
      icon={<Meditation className="text-[#92c652]" />}
      label="Медитация"
      colors={['#b5c798', '#f6fee9', '#defcc3']}
    />
  )
}
