import * as React from 'react'

import { Walking } from '@/shared'
// import { routes } from '@/app/routes'

import type { ResourceWidgetValue } from './types'

import { ResourceWidget } from './widget'

export const WalkingWidget: React.FC<ResourceWidgetValue> = ({ value }) => {
  return (
    <ResourceWidget
      // link={routes.walking}
      value={value}
      icon={<Walking className="text-[#c67d52]" />}
      label="Прогулка"
      colors={['#c7ae98', '#fef8e9', '#fcdec3']}
    />
  )
}
