import * as React from 'react'

type MoodButtonProps = React.HTMLAttributes<HTMLButtonElement>

export const MoodButton: React.FC<MoodButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="h-14 w-14 rounded-full text-[32px] transition-all duration-300 ease-in hover:bg-[#FEF1E9] active:bg-[#FEF1E9]"
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}
