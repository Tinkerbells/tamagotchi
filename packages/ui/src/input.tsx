import { cn } from '@tamagotchi/utils'
import * as React from 'react'

interface InputProps extends React.ComponentProps<'input'> {
  label?: string
  name?: string
  placeholder?: string
  required?: boolean
  isError?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, placeholder, required, className, isError, ...rest },
    ref
  ) => {
    const id = React.useId()
    console.log(rest.value)
    return (
      <div>
        {(label || name) && (
          <label htmlFor={id} className={cn(!label && 'sr-only')}>
            {label || name}
          </label>
        )}
        <input
          name={name}
          id={id}
          className={cn(
            'form-input rounded-2xl bg-[#f4f2f9] px-8 py-2 text-[#7F7C82] focus:ring-0',
            isError ? 'border-3 border-red focus:border-red' : 'border-none',
            className,
            'w-full'
          )}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          ref={ref}
          {...rest}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
