import { cn } from '@tamagotchi/utils'
import * as React from 'react'

export const Spinner: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin', className)}
      {...props}
    >
      <circle
        cx="28"
        cy="28"
        r="23"
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="9"
      />
      <path
        d="M18.6929 49.0328C15.4158 47.5826 12.5228 45.3868 10.2449 42.6204C7.96685 39.8539 6.36681 36.5935 5.57234 33.099C4.77786 29.6046 4.81093 25.9728 5.66892 22.4934C6.5269 19.014 8.18606 15.7832 10.5141 13.0587C12.8421 10.3342 15.7745 8.19143 19.0775 6.80122C22.3805 5.411 25.9626 4.81183 29.5382 5.05149C33.1138 5.29116 36.5839 6.36303 39.6718 8.18162C42.7597 10.0002 45.38 12.5152 47.3235 15.526"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  )
}
