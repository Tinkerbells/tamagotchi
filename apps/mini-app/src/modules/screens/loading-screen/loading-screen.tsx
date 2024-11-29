import { Spinner } from '@tamagotchi/ui'

export const LoadingScreen = () => {
  return (
    <section className="bg-main relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 bg-blend-multiply">
      <div className="absolute left-1/2 top-1/2 h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2">
        <Spinner className="h-full w-full" />
      </div>
      <svg
        width="338"
        height="338"
        viewBox="0 0 338 338"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="168.5"
          cy="169.5"
          r="48.5"
          stroke="#EB6D26"
          strokeOpacity="0.24"
        />
        <circle
          cx="166"
          cy="169"
          r="98"
          stroke="#EB6D26"
          strokeOpacity="0.16"
        />
        <circle
          cx="169"
          cy="169"
          r="168"
          stroke="#EB6D26"
          strokeOpacity="0.12"
        />
      </svg>
      <svg
        width="345"
        height="505"
        viewBox="0 0 345 505"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <g filter="url(#filter0_f_250_1611)">
          <ellipse cx="-2" cy="157.5" rx="109" ry="109.5" fill="#FBDA9B" />
        </g>
        <defs>
          <filter
            id="filter0_f_250_1611"
            x="-348.5"
            y="-189.5"
            width="693"
            height="694"
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
            <feGaussianBlur
              stdDeviation="118.75"
              result="effect1_foregroundBlur_250_1611"
            />
          </filter>
        </defs>
      </svg>
      <svg
        width="347"
        height="549"
        viewBox="0 0 347 549"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0"
      >
        <g filter="url(#filter0_f_250_1612)">
          <circle cx="277" cy="277" r="107" fill="#FCDECE" />
        </g>
        <defs>
          <filter
            id="filter0_f_250_1612"
            x="0.300003"
            y="0.300003"
            width="553.4"
            height="553.4"
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
            <feGaussianBlur
              stdDeviation="84.85"
              result="effect1_foregroundBlur_250_1612"
            />
          </filter>
        </defs>
      </svg>
    </section>
  )
}
