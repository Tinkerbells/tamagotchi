import { ResourceWidgetValue } from './types'
import { ResourceWidget } from './widget'
import { Sleep } from '@/shared'
import * as React from 'react'

export const SleepWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      value={value}
      icon={<Sleep className="text-[#c65294]" />}
      label="Сон"
      colors={['#c798ad', '#fee9fa', '#fcc3dd']}
    />
  )
}
