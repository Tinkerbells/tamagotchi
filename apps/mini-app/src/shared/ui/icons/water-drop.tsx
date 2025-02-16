import * as React from 'react'

export function WaterDrop({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.25338 18.8076C9.42702 18.7882 9.56274 18.7295 9.66054 18.6315C9.75854 18.5337 9.80754 18.4129 9.80754 18.2692C9.80754 18.1018 9.74999 17.9728 9.63488 17.8822C9.51977 17.7918 9.37841 17.7563 9.21079 17.7757C8.41357 17.834 7.52292 17.5853 6.53884 17.0296C5.55456 16.4739 4.94575 15.5447 4.71242 14.2419C4.67353 14.0579 4.60888 13.9204 4.51846 13.8292C4.42785 13.738 4.31303 13.6924 4.174 13.6924C4.02136 13.6924 3.89118 13.7495 3.78346 13.8639C3.67593 13.9784 3.64385 14.1493 3.68721 14.3766C3.98782 15.9965 4.73565 17.1557 5.93071 17.8542C7.12577 18.5526 8.23332 18.8704 9.25338 18.8076ZM8.99992 21.5C6.66503 21.5 4.7202 20.6983 3.16542 19.0949C1.61064 17.4915 0.833252 15.4932 0.833252 13.1C0.833252 11.4249 1.50895 9.572 2.86034 7.54142C4.21172 5.51103 6.25825 3.28357 8.99992 0.859039C11.7416 3.28357 13.7881 5.51103 15.1395 7.54142C16.4909 9.572 17.1666 11.4249 17.1666 13.1C17.1666 15.4932 16.3892 17.4915 14.8344 19.0949C13.2796 20.6983 11.3348 21.5 8.99992 21.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
