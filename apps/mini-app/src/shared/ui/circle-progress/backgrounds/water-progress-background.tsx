export function WaterProgressBackground({ x, y }: { x: number, y: number }) {
  return (
    <svg
      x={x}
      y={y}
      width={268}
      height={268}
      viewBox="0 0 268 268"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_295_3470"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="0"
        width="255"
        height="255"
      >
        <circle cx="131.5" cy="127.5" r="127.5" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_295_3470)">
        <path
          d="M135.335 465.523C94.5421 521.839 28.2856 558.466 -46.5164 558.466C-170.495 558.466 -271 457.849 -271 333.733C-271 209.616 -175.479 125.5 -51.5 125.5C-6.36328 125.5 48.2625 126.774 96.4288 144.593C147.96 163.657 205.5 162.804 249.981 130.551C267.62 117.761 288.955 109 317.187 109C441.166 109 541.671 209.616 541.671 333.733C541.671 457.849 441.166 558.466 317.187 558.466C242.385 558.466 176.129 521.839 135.335 465.523Z"
          fill="url(#paint0_linear_295_3470)"
        />
        <path
          d="M196.952 475.321C156.159 531.637 89.9028 568.264 15.1008 568.264C-108.878 568.264 -209.383 467.648 -209.383 343.531C-209.383 219.415 -108.878 118.798 15.1008 118.798C53.451 118.798 89.5551 128.426 121.133 145.398C168.85 171.044 231.701 179.204 274.532 146.035C409.186 41.7591 473.848 49 537.5 49C661.479 49 603.288 219.415 603.288 343.531C603.288 467.648 502.783 568.264 378.804 568.264C304.002 568.264 237.746 531.637 196.952 475.321Z"
          fill="url(#paint1_linear_295_3470)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_295_3470"
          x1="338.801"
          y1="121.282"
          x2="-27.1987"
          y2="210.782"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DEF1F3" />
          <stop offset="1" stopColor="#B1EDF4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_295_3470"
          x1="75"
          y1="125.5"
          x2="261.5"
          y2="223.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2F3F5" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  )
}
