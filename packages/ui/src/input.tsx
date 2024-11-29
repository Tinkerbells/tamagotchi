import { cn } from '@tamagotchi/utils'
import * as React from 'react'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  isError?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      placeholder,
      value = '',
      onChange,
      required,
      className,
      isError,
      ...rest
    },
    ref
  ) => {
    const id = React.useId()
    return (
      <div>
        {(label || name) && (
          <label htmlFor={id} className={cn(!label && 'sr-only')}>
            {label || name}
          </label>
        )}
        <input
          ref={ref}
          name={name}
          id={id}
          className={cn(
            'form-input rounded-2xl bg-[#f4f2f9] px-8 py-2 text-[#7F7C82] focus:ring-0',
            isError ? 'border-3 border-red focus:border-red' : 'border-none',
            className,
            'w-full'
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          {...rest}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
