import { StepDots, StepOne, StepThree, StepTwo } from './steps/steps'
import { Button } from '@tamagotchi/ui'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

export const StartScreen = () => {
  const [step, setStep] = React.useState(0)
  const navigator = useRouteNavigator()
  const steps = [
    <StepOne currentStep={step} />,
    <StepTwo currentStep={step} />,
    <StepThree currentStep={step} />,
  ]

  const handleNext = React.useCallback(() => {
    if (step === 2) {
      navigator.push('home')
    } else {
      setStep((prev) => prev + 1)
    }
  }, [setStep, step, navigator])

  return (
    <div className="bg-main relative flex h-screen w-full flex-col items-center overflow-hidden px-4 bg-blend-multiply">
      <svg
        width="345"
        height="505"
        viewBox="0 0 345 505"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0"
      >
        <g filter="url(#filter0_f_295_1717)">
          <ellipse cx="-2" cy="157.5" rx="109" ry="109.5" fill="#FBDA9B" />
        </g>
        <defs>
          <filter
            id="filter0_f_295_1717"
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
              result="effect1_foregroundBlur_295_1717"
            />
          </filter>
        </defs>
      </svg>
      <AnimatePresence initial={false}>
        <motion.div
          className="z-10 mt-10"
          key={step}
          initial={{
            opacity: 0,
            x: -200,
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.2,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
      <StepDots className="absolute mt-[27rem]" currentStep={step} />
      <Button
        className="font-vk absolute bottom-8 w-[calc(100%-3rem)]"
        variant={'primary'}
        onClick={handleNext}
      >
        {step < 2 ? 'Далее' : 'Вперед'}
      </Button>
      <svg
        width="347"
        height="554"
        viewBox="0 0 347 554"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0"
      >
        <g filter="url(#filter0_f_295_1718)">
          <circle cx="277" cy="277" r="107" fill="#FCDECE" />
        </g>
        <defs>
          <filter
            id="filter0_f_295_1718"
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
              result="effect1_foregroundBlur_295_1718"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
