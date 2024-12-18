import { cva } from 'class-variance-authority'
import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

export const navbarItemVariants = cva(
  'inline-flex gap-1 justify-center items-center rounded-lg h-8 transition-all text-[12px] font-medium',
  {
    variants: {
      variant: {
        default: 'text-[#818c99]',
        active:
          'text-[#d49571] bg-white border-[0.5px] border-custom-border shadow-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type NavbarItemProps = NavLinkProps

export const NavbarItem: React.FC<NavbarItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? navbarItemVariants({ variant: 'active', className })
          : navbarItemVariants({ variant: 'default', className })
      }
      {...props}
    >
      {children}
    </NavLink>
  )
}
