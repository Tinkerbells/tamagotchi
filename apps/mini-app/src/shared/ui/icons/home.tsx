import * as React from 'react'

export const Home = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_593_1816"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <rect x="0.166748" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_593_1816)">
        <path
          d="M5.16667 15.8333H7.66667V10.8333H12.6667V15.8333H15.1667V8.3333L10.1667 4.5833L5.16667 8.3333V15.8333ZM3.5 17.5V7.49997L10.1667 2.49997L16.8333 7.49997V17.5H11V12.5H9.33333V17.5H3.5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
