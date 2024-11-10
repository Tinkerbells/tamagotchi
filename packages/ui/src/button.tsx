import { cn } from '@tamagotchi/utils'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'

export const buttonVariants = cva(
  'items-center font-normal justify-center rounded-full text-base transition-all px-8',
  {
    variants: {
      variant: {
        primary: 'bg-secondary text-primary',
      },
      size: { M: 'py-3', L: 'py-4' },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'M',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  isLoading?: boolean
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      href,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    if (href) {
      return (
        <a
          href={href}
          className={cn(buttonVariants({ size, variant, className }))}
        >
          {children}
        </a>
      )
    }
    return (
      <button
        type="button"
        className={cn(buttonVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
        {/* {isLoading && <Lucide.Loader />} */}
      </button>
    )
  }
)

Button.displayName = 'Button'
