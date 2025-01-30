import { WaterProgressBackground } from './backgrounds'
import React from 'react'

export interface CircleProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  progress,
  size = 340,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress / 100)

  // Calculate endpoint position
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2
  const endX = center + radius * Math.cos(angle)
  const endY = center + radius * Math.sin(angle)

  return (
    <svg width={size} height={size} viewBox="-40 -40 400 400">
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#D6EDEF"
        strokeWidth={strokeWidth}
      />

      {/* Progress circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#0BB5B5"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
      />

      {/* Endpoint marker with filter */}
      <g filter="url(#filter0_d_295_3438)">
        <circle cx={endX} cy={endY} r="22" fill="white" />
      </g>

      <defs>
        <filter
          id="filter0_d_295_3438"
          x={endX - 40}
          y={endY - 40}
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_295_3438"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="7.55" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.252412 0 0 0 0 0.560693 0 0 0 0 0.523834 0 0 0 0.19 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_295_3438"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_295_3438"
            result="shape"
          />
        </filter>
      </defs>
      <WaterProgressBackground size={size} />
    </svg>
  )
}
