import type { AccessoryType } from '@tamagotchi/api/hc'

import { ACCESSORIES_ENUM } from '@tamagotchi/api/hc'

import cook from '/images/shop/accessories/cook-hat.webp'
import king from '/images/shop/accessories/king-hat.webp'
import angel from '/images/shop/accessories/angel-hat.webp'
import joker from '/images/shop/accessories/joker-hat.webp'
import santa from '/images/shop/accessories/santa-hat.webp'
import witch from '/images/shop/accessories/witch-hat.webp'
import pirate from '/images/shop/accessories/pirate-hat.webp'
import birthday from '/images/shop/accessories/birthday-hat.webp'

export function getHat(type: AccessoryType) {
  switch (type) {
    case ACCESSORIES_ENUM.pirate:
      return pirate
    case ACCESSORIES_ENUM.angel:
      return angel
    case ACCESSORIES_ENUM.witch:
      return witch
    case ACCESSORIES_ENUM.santa:
      return santa
    case ACCESSORIES_ENUM.king:
      return king
    case ACCESSORIES_ENUM.birthday:
      return birthday
    case ACCESSORIES_ENUM.cook:
      return cook
    case ACCESSORIES_ENUM.joker:
      return joker
    default:
      return angel
  }
}
