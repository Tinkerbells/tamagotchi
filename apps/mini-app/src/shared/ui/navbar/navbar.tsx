import { Account, Home, Reward, Shop } from '../icons'
import { NavbarItem } from './navbar-item'

export const Navbar = () => {
  return (
    <header className="fixed top-16 z-10 flex h-8 w-full justify-center">
      <nav className="flex gap-4 overflow-x-auto">
        <NavbarItem to="/" className="w-[106px]">
          <Home /> Дом
        </NavbarItem>
        <NavbarItem to="/shop" className="w-[106px]">
          <Shop /> Магазин
        </NavbarItem>
        <NavbarItem to="/profile" className="w-[106px]">
          <Account /> Профиль
        </NavbarItem>
        <NavbarItem className="w-8" to="/achievements">
          <Reward />
        </NavbarItem>
      </nav>
    </header>
  )
}
