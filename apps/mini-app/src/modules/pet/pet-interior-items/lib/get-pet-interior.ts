import books from '@public/images/pet/interior-items/books.webp'
import cookies from '@public/images/pet/interior-items/cookies.webp'
import cup from '@public/images/pet/interior-items/cup.webp'
import garlands from '@public/images/pet/interior-items/garlands.webp'
import lamp from '@public/images/pet/interior-items/lamp.webp'
import paintLandscape from '@public/images/pet/interior-items/paint-landscape.webp'
import { INTERIOR_ITEMS_ENUM, InteriorType } from '@tamagotchi/api/hc'

export const getPetInterirorItem = (type: InteriorType) => {
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
