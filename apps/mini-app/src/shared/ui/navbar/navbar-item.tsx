import * as React from 'react'

interface NavbarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

const NavbarItemVariants = cva

export const NavbarItem: React.FC<NavbarItemProps> = ({
  children,
  isActive,
  className,
  ...props
}) => {
  return <button></button>
}
