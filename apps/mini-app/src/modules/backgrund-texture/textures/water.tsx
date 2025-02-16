export function WaterBackground() {
  return (
    <>
      <svg
        width="375"
        height="441"
        viewBox="0 0 375 441"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0"
      >
        <g filter="url(#filter0_f_345_4962)">
          <ellipse cx="87.5" cy="172" rx="67.5" ry="68" fill="#9BF5FB" />
        </g>
        <g filter="url(#filter1_f_345_4962)">
          <circle cx="253" cy="157" r="70" fill="#CEFCE6" />
        </g>
        <defs>
          <filter
            id="filter0_f_345_4962"
            x="-180.4"
            y="-96.4"
            width="535.8"
            height="536.8"
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
              stdDeviation="100.2"
              result="effect1_foregroundBlur_345_4962"
            />
          </filter>
          <filter
            id="filter1_f_345_4962"
            x="91"
            y="-5"
            width="324"
            height="324"
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
              stdDeviation="46"
              result="effect1_foregroundBlur_345_4962"
            />
          </filter>
        </defs>
      </svg>
    </>
  )
}
