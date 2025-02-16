import type { InteriorType } from '@tamagotchi/api/hc'

import { INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

import cup from '/images/pet/interior-items/cup.webp'
import lamp from '/images/pet/interior-items/lamp.webp'
import books from '/images/pet/interior-items/books.webp'
import cookies from '/images/pet/interior-items/cookies.webp'
import garlands from '/images/pet/interior-items/garlands.webp'
import paintLandscape from '/images/pet/interior-items/paint-landscape.webp'

export function getPetInterirorItem(type: InteriorType) {
  switch (type) {
    case INTERIOR_ITEMS_ENUM.cup:
      return cup
    case INTERIOR_ITEMS_ENUM.cookies:
      return cookies
    case INTERIOR_ITEMS_ENUM.books:
      return books
    case INTERIOR_ITEMS_ENUM.lamp:
      return lamp
    case INTERIOR_ITEMS_ENUM.paintLandscape:
      return paintLandscape
    case INTERIOR_ITEMS_ENUM.garlands:
      return garlands
    default:
      return cup
  }
}
