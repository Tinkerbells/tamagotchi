import * as React from 'react'

export const Shop = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_593_1821"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_593_1821)">
        <path
          d="M4.16667 18.3333C3.70833 18.3333 3.31597 18.1701 2.98958 17.8437C2.66319 17.5174 2.5 17.125 2.5 16.6667V6.66666C2.5 6.20833 2.66319 5.81597 2.98958 5.48958C3.31597 5.16319 3.70833 4.99999 4.16667 4.99999H5.83333C5.83333 3.84722 6.23958 2.86458 7.05208 2.05208C7.86458 1.23958 8.84722 0.833328 10 0.833328C11.1528 0.833328 12.1354 1.23958 12.9479 2.05208C13.7604 2.86458 14.1667 3.84722 14.1667 4.99999H15.8333C16.2917 4.99999 16.684 5.16319 17.0104 5.48958C17.3368 5.81597 17.5 6.20833 17.5 6.66666V16.6667C17.5 17.125 17.3368 17.5174 17.0104 17.8437C16.684 18.1701 16.2917 18.3333 15.8333 18.3333H4.16667ZM4.16667 16.6667H15.8333V6.66666H4.16667V16.6667ZM10 11.6667C11.1528 11.6667 12.1354 11.2604 12.9479 10.4479C13.7604 9.63541 14.1667 8.65277 14.1667 7.49999H12.5C12.5 8.19444 12.2569 8.78472 11.7708 9.27083C11.2847 9.75694 10.6944 9.99999 10 9.99999C9.30556 9.99999 8.71528 9.75694 8.22917 9.27083C7.74306 8.78472 7.5 8.19444 7.5 7.49999H5.83333C5.83333 8.65277 6.23958 9.63541 7.05208 10.4479C7.86458 11.2604 8.84722 11.6667 10 11.6667ZM7.5 4.99999H12.5C12.5 4.30555 12.2569 3.71527 11.7708 3.22916C11.2847 2.74305 10.6944 2.49999 10 2.49999C9.30556 2.49999 8.71528 2.74305 8.22917 3.22916C7.74306 3.71527 7.5 4.30555 7.5 4.99999Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
