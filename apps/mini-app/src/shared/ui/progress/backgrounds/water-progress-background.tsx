import { CircleProgressProps } from '../progress'

export const WaterProgressBackground = ({
  size,
}: {
  size: CircleProgressProps['size']
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_295_3470"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={size}
        height={size}
      >
        <circle cx="127.5" cy="127.5" r="127.5" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_295_3470)">
        <path
          d="M131.335 465.523C90.5421 521.839 24.2856 558.466 -50.5164 558.466C-174.495 558.466 -275 457.849 -275 333.733C-275 209.616 -179.479 125.5 -55.5 125.5C-10.3633 125.5 44.2625 126.774 92.4288 144.593C143.96 163.657 201.5 162.804 245.981 130.551C263.62 117.761 284.955 109 313.187 109C437.166 109 537.671 209.616 537.671 333.733C537.671 457.849 437.166 558.466 313.187 558.466C238.385 558.466 172.129 521.839 131.335 465.523Z"
          fill="url(#paint0_linear_295_3470)"
        />
        <path
          d="M192.952 475.321C152.159 531.637 85.9028 568.264 11.1008 568.264C-112.878 568.264 -213.383 467.648 -213.383 343.531C-213.383 219.415 -112.878 118.798 11.1008 118.798C49.451 118.798 85.5551 128.426 117.133 145.398C164.85 171.044 227.701 179.204 270.532 146.035C405.186 41.7591 469.848 49 533.5 49C657.479 49 599.288 219.415 599.288 343.531C599.288 467.648 498.783 568.264 374.804 568.264C300.002 568.264 233.746 531.637 192.952 475.321Z"
          fill="url(#paint1_linear_295_3470)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_295_3470"
          x1="334.801"
          y1="121.282"
          x2="-31.1987"
          y2="210.782"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#DEF1F3" />
          <stop offset="1" stop-color="#B1EDF4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_295_3470"
          x1="71"
          y1="125.5"
          x2="257.5"
          y2="223.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E2F3F5" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
  )
}
