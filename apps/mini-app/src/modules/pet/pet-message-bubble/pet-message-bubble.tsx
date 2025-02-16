import * as React from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogTrigger } from '@tamagotchi/ui'

import { MoodStatusDialog } from '@/modules/modals'

interface PetMessageBubble {
  message: string
}

export const PetMessageBubble: React.FC<PetMessageBubble> = ({ message }) => {
  return (
    <Dialog>
      <div className="absolute ml-[50%] mt-6">
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <SmallBubble />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <LargeBubble />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <DialogTrigger className="shadow-bubble-message mt-8 flex h-14 w-[176px] items-center justify-center rounded-3xl bg-white px-2 py-4 text-[15px] font-medium text-[#533325]">
            {message}
          </DialogTrigger>
        </motion.div>
        <MoodStatusDialog />
      </div>
    </Dialog>
  )
}

function LargeBubble() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-8"
    >
      <g filter="url(#filter0_diiii_295_2418)">
        <circle cx="19" cy="13" r="10" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_diiii_295_2418"
          x="0.4"
          y="0"
          width="37.2"
          height="37.6"
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
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_295_2418"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="5.8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.767236 0 0 0 0 0.390358 0 0 0 0 0.231232 0 0 0 0.32 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_295_2418"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_295_2418"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect2_innerShadow_295_2418"
          />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="1.85" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.815686 0 0 0 0 0.392157 0 0 0 0 0.223529 0 0 0 0.24 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_295_2418"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect3_innerShadow_295_2418"
          />
          <feOffset dy="-6" />
          <feGaussianBlur stdDeviation="1.9" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.627572 0 0 0 0 0.253974 0 0 0 0 0.0942481 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_295_2418"
            result="effect3_innerShadow_295_2418"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_295_2418"
            result="effect4_innerShadow_295_2418"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_295_2418"
            result="effect5_innerShadow_295_2418"
          />
        </filter>
      </defs>
    </svg>
  )
}

function SmallBubble() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -top-4 right-14"
    >
      <g filter="url(#filter0_diiii_295_2420)">
        <circle cx="13" cy="10" r="5" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_diiii_295_2420"
          x="0.6"
          y="0.6"
          width="24.8"
          height="24.8"
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
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_295_2420"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="4.2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.767236 0 0 0 0 0.390358 0 0 0 0 0.231232 0 0 0 0.28 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_295_2420"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_295_2420"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect2_innerShadow_295_2420"
          />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="1.85" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.815686 0 0 0 0 0.392157 0 0 0 0 0.223529 0 0 0 0.24 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_295_2420"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="dilate"
            in="SourceAlpha"
            result="effect3_innerShadow_295_2420"
          />
          <feOffset dy="-6" />
          <feGaussianBlur stdDeviation="1.9" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.627572 0 0 0 0 0.253974 0 0 0 0 0.0942481 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_295_2420"
            result="effect3_innerShadow_295_2420"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_295_2420"
            result="effect4_innerShadow_295_2420"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_295_2420"
            result="effect5_innerShadow_295_2420"
          />
        </filter>
      </defs>
    </svg>
  )
}
