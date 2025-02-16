import * as React from 'react'

export function ArrowDropdownCircle({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_91_399"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_91_399)">
        <path
          d="M15.9999 19.641L20.7179 14.923H11.2819L15.9999 19.641ZM16.0023 28.6666C14.2503 28.6666 12.6035 28.3342 11.0619 27.6693C9.52036 27.0044 8.17947 26.1021 7.03925 24.9623C5.89903 23.8225 4.99625 22.4822 4.33092 20.9413C3.66581 19.4004 3.33325 17.7541 3.33325 16.0023C3.33325 14.2503 3.6657 12.6035 4.33059 11.062C4.99547 9.52042 5.89781 8.17953 7.03759 7.03931C8.17736 5.89909 9.5177 4.99631 11.0586 4.33098C12.5995 3.66587 14.2458 3.33331 15.9976 3.33331C17.7496 3.33331 19.3964 3.66576 20.9379 4.33065C22.4795 4.99553 23.8204 5.89787 24.9606 7.03765C26.1008 8.17742 27.0036 9.51776 27.6689 11.0586C28.334 12.5995 28.6666 14.2459 28.6666 15.9976C28.6666 17.7496 28.3341 19.3964 27.6693 20.938C27.0044 22.4795 26.102 23.8204 24.9623 24.9606C23.8225 26.1009 22.4821 27.0036 20.9413 27.669C19.4004 28.3341 17.754 28.6666 16.0023 28.6666ZM15.9999 26.6666C18.9777 26.6666 21.4999 25.6333 23.5666 23.5666C25.6333 21.5 26.6666 18.9778 26.6666 16C26.6666 13.0222 25.6333 10.5 23.5666 8.43331C21.4999 6.36665 18.9777 5.33331 15.9999 5.33331C13.0221 5.33331 10.4999 6.36665 8.43325 8.43331C6.36659 10.5 5.33325 13.0222 5.33325 16C5.33325 18.9778 6.36659 21.5 8.43325 23.5666C10.4999 25.6333 13.0221 26.6666 15.9999 26.6666Z"
          fill="#818C99"
        />
      </g>
    </svg>
  )
}
