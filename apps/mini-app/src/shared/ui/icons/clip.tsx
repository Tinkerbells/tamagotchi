import * as React from 'react'

export function Clip({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="64"
      height="77"
      viewBox="0 0 64 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i_20_5441)">
        <path
          d="M24.5 71.5001C53.1711 51.3041 108.104 12.2085 102.538 4.307C96.9727 -3.59449 69.2181 6.37213 40.547 26.5681C11.8759 46.764 -11 76.5001 8.99992 75.0001"
          stroke="#BEBEBE"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_20_5441"
          x="0.442505"
          y="0.597473"
          width="103.491"
          height="77.3572"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="0.95" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_20_5441"
          />
        </filter>
      </defs>
    </svg>
  )
}
