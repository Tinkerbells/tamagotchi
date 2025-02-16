import { cn } from '@tamagotchi/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

export const buttonVariants = cva(
  'flex items-center font-normal justify-center rounded-2xl text-base transition-all px-8',
  {
    variants: {
      variant: {
        primary: 'bg-secondary text-primary',
        secondary: 'bg-white text-[#D49571]',
        outline: 'bg-white text-primary border-[2px] border-[#fcdec3]',
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
        {isLoading && <Loader2 className="mr-2 min-h-5 min-w-5 h-5 w-5 animate-spin" />}
        {children}
        {rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
