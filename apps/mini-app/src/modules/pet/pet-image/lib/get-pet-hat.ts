import angel from '/images/pet/accessories/angel-hat.webp'
import birthday from '/images/pet/accessories/birthday-hat.webp'
import cook from '/images/pet/accessories/cook-hat.webp'
import joker from '/images/pet/accessories/joker-hat.webp'
import king from '/images/pet/accessories/king-hat.webp'
import pirate from '/images/pet/accessories/pirate-hat.webp'
import santa from '/images/pet/accessories/santa-hat.webp'
import witch from '/images/pet/accessories/witch-hat.webp'
import { AccessoryType, ACCESSORIES_ENUM } from '@tamagotchi/api/hc'

export const getPetHat = (type: AccessoryType) => {
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
