import * as React from 'react'

export function Heart({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 17.3267L8.89625 16.3345C7.23858 14.8307 5.86775 13.5384 4.78375 12.4577C3.69975 11.3769 2.84075 10.415 2.20675 9.57199C1.57275 8.72916 1.12983 7.96024 0.878 7.26524C0.626 6.57041 0.5 5.86533 0.5 5.14999C0.5 3.73083 0.9785 2.54266 1.9355 1.58549C2.89267 0.628493 4.08083 0.149994 5.5 0.149994C6.373 0.149994 7.198 0.354161 7.975 0.762494C8.752 1.17083 9.427 1.75641 10 2.51924C10.573 1.75641 11.248 1.17083 12.025 0.762494C12.802 0.354161 13.627 0.149994 14.5 0.149994C15.9192 0.149994 17.1073 0.628493 18.0645 1.58549C19.0215 2.54266 19.5 3.73083 19.5 5.14999C19.5 5.86533 19.374 6.57041 19.122 7.26524C18.8702 7.96024 18.4272 8.72916 17.7932 9.57199C17.1592 10.415 16.3018 11.3769 15.221 12.4577C14.1403 13.5384 12.7679 14.8307 11.1038 16.3345L10 17.3267Z"
        fill="currentColor"
      />
    </svg>
  )
}
