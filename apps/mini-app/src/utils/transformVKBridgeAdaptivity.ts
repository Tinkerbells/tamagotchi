import type { AdaptivityProps } from '@vkontakte/vkui'
import type { UseAdaptivity } from '@vkontakte/vk-bridge-react'

import {

  getViewHeightByViewportHeight,
  getViewWidthByViewportWidth,
  SizeType,
  ViewWidth,
} from '@vkontakte/vkui'

export function transformVKBridgeAdaptivity({
  type,
  viewportWidth,
  viewportHeight,
}: UseAdaptivity): AdaptivityProps {
  switch (type) {
    case 'adaptive':
      return {
        viewWidth: getViewWidthByViewportWidth(viewportWidth),
        viewHeight: getViewHeightByViewportHeight(viewportHeight),
      }
    case 'force_mobile':
    case 'force_mobile_compact':
      return {
        viewWidth: ViewWidth.MOBILE,
        sizeX: SizeType.COMPACT,
        sizeY: type === 'force_mobile_compact' ? SizeType.COMPACT : SizeType.REGULAR,
      }
    default:
      return {}
  }
}
