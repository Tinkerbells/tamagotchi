import * as React from 'react'

export const Sleep = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.3261 19.5C8.99657 19.5 7.74983 19.2477 6.58582 18.7432C5.42166 18.2387 4.40624 17.5532 3.53957 16.6865C2.67291 15.8198 1.98732 14.8044 1.48282 13.6402C0.978324 12.4762 0.726074 11.2295 0.726074 9.89999C0.726074 7.71032 1.39374 5.75999 2.72907 4.04899C4.06424 2.33816 5.79082 1.21607 7.90882 0.682739C7.72416 2.28791 7.88949 3.84432 8.40482 5.35199C8.92032 6.85966 9.75049 8.18591 10.8953 9.33074C12.0402 10.4756 13.3664 11.3057 14.8741 11.8212C16.3817 12.3366 17.9382 12.5019 19.5433 12.3172C19.0203 14.4352 17.9007 16.1618 16.1846 17.497C14.4686 18.8323 12.5157 19.5 10.3261 19.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
