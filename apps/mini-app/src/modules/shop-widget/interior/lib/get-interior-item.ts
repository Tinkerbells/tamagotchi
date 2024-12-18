import books from '/images/shop/interior/books.webp'
import cookies from '/images/shop/interior/cookies.webp'
import cup from '/images/shop/interior/cup.webp'
import garlands from '/images/shop/interior/garlands.webp'
import lamp from '/images/shop/interior/lamp.webp'
import paintBird from '/images/shop/interior/paint-bird.webp'
import paintDog from '/images/shop/interior/paint-dog.webp'
import paintFlowers from '/images/shop/interior/paint-flowers.webp'
import paintLandscape from '/images/shop/interior/paint-landscape.webp'
import { InteriorType, INTERIOR_ITEMS_ENUM } from '@tamagotchi/api/hc'

export const getInteriorItem = (type: InteriorType) => {
  switch (type) {
    case INTERIOR_ITEMS_ENUM.lamp:
      return lamp
    case INTERIOR_ITEMS_ENUM.books:
      return books
    case INTERIOR_ITEMS_ENUM.cookies:
      return cookies
    case INTERIOR_ITEMS_ENUM.cup:
      return cup
    case INTERIOR_ITEMS_ENUM.garlands:
      return garlands
    case INTERIOR_ITEMS_ENUM.paintBird:
      return paintBird
    case INTERIOR_ITEMS_ENUM.paintDog:
      return paintDog
    case INTERIOR_ITEMS_ENUM.paintFlowers:
      return paintFlowers
    case INTERIOR_ITEMS_ENUM.paintLandscape:
      return paintLandscape
    default:
      return lamp
  }
}
