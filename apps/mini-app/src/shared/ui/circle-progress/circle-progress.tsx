import { WaterProgressBackground } from './backgrounds'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'

export interface CircleProgressProps {
  progress: number
  type: 'water' | 'sleep'
  onProgressChange: (progress: number) => void
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  progress,
  type,
  onProgressChange,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const radius = 130
  const center = 134
  const circumference = 2 * Math.PI * radius
  const previousProgress = useRef(progress)

  const getSVGPoint = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 }
    const pt = svgRef.current.createSVGPoint()
    pt.x = clientX
    pt.y = clientY
    return pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse())
  }

  const handleDrag = (event: DragEvent) => {
    const { clientX, clientY } = event
    const { x: svgX, y: svgY } = getSVGPoint(clientX, clientY)

    const relX = svgX - center
    const relY = center - svgY
    const standardAngle = Math.atan2(relY, relX)

    // Calculate angle with proper wrapping
    let theta = (Math.PI / 2 - standardAngle + 2 * Math.PI) % (2 * Math.PI)

    // Calculate raw progress value
    let newProgress = (theta / (2 * Math.PI)) * 100

    // Prevent circular wrapping
    const diff = newProgress - previousProgress.current
    const wrapAround = Math.abs(diff) > 50 // Detect full-circle jumps

    if (wrapAround) {
      if (diff > 0) {
        // Prevent clockwise overflow
        newProgress = previousProgress.current === 100 ? 100 : 0
      } else {
        // Prevent counter-clockwise underflow
        newProgress = previousProgress.current === 0 ? 0 : 100
      }
    }

    // Apply hard limits
    if (previousProgress.current === 100 && newProgress < 100) {
      // Allow only downward movement from 100%
      newProgress = Math.min(100, Math.max(98, newProgress))
    } else if (previousProgress.current === 0 && newProgress > 0) {
      // Allow only upward movement from 0%
      newProgress = Math.max(0, Math.min(2, newProgress))
    }

    const clampedProgress = Math.min(100, Math.max(0, newProgress))
    previousProgress.current = clampedProgress
    onProgressChange(clampedProgress)
  }

  // Calculate knob position
  const angle = (progress / 100) * 2 * Math.PI
  const knobX = center + radius * Math.sin(angle)
  const knobY = center - radius * Math.cos(angle)

  return (
    <svg
      ref={svgRef}
      width={268}
      height={268}
      viewBox="0 0 268 268"
      className="overflow-visible"
    >
      {/* Background circle */}
      {type === 'water' && (
        <WaterProgressBackground x={center - 131.5} y={center - 127.5} />
      )}

      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#d6edef"
        strokeWidth="8"
      />

      {/* Progress */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#0bb5b5"
        strokeWidth="8"
        strokeDasharray={`${circumference * (progress / 100)} ${circumference}`}
        transform={`rotate(-90 ${center} ${center})`}
      />

      <motion.g
        filter="url(#filter0_d_295_3438)"
        style={{ cursor: 'grab' }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <motion.circle
          cx={knobX}
          cy={knobY}
          r="16"
          fill="white"
          drag
          onDrag={handleDrag}
          dragConstraints={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          dragElastic={0}
          dragMomentum={false}
          style={{
            cursor: progress === 100 ? 'default' : 'grab',
            pointerEvents: progress === 100 ? 'none' : 'auto',
          }}
        />
      </motion.g>
      <defs>
        <filter
          id="filter0_d_295_3438"
          x={knobX - 40}
          y={knobY - 40}
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="dilate"
            result="effect1_dropShadow_295_3438"
            in="SourceAlpha"
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
    </svg>
  )
}
