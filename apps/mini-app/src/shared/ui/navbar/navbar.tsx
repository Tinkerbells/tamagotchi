import { motion } from 'framer-motion'

import { NavbarItem } from './navbar-item'
import { Account, Home, Reward, Shop } from '../icons'

export interface NavbarProps {
  isVisible?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ isVisible = true }) => {
  return (
    <motion.header
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
      className="fixed top-[6vh] z-10 flex h-8 w-full justify-center"
    >
      <nav className="flex gap-4 overflow-x-auto">
        <NavbarItem to="/" className="w-[106px]">
          <Home />
          {' '}
          Дом
        </NavbarItem>
        <NavbarItem to="/shop" className="w-[106px]">
          <Shop />
          {' '}
          Магазин
        </NavbarItem>
        <NavbarItem to="/profile" className="w-[106px]">
          <Account />
          {' '}
          Профиль
        </NavbarItem>
        <NavbarItem className="w-8" to="/achievements">
          <Reward />
        </NavbarItem>
      </nav>
    </motion.header>
  )
}
