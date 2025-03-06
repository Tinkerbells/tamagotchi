import * as React from 'react'
import { Button } from '@tamagotchi/ui'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { Screen } from '../screen'
import { StepDots, StepOne, StepThree, StepTwo } from './steps'

export function StartScreen() {
  const [step, setStep] = React.useState(0)
  const navigate = useNavigate()
  const steps = [
    <StepOne currentStep={step} />,
    <StepTwo currentStep={step} />,
    <StepThree currentStep={step} />,
  ]

  const handleNext = React.useCallback(async () => {
    switch (step) {
      case 2:
        navigate('/create-pet')
        break
      default:
        setStep(prev => prev + 1)
    }
  }, [setStep, step, navigator])
  return (
    <Screen>
      <div className="flex flex-col justify-between items-center w-full h-full pb-2 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            className="z-10 mt-10 flex flex-col justify-between h-full"
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
        <StepDots className="mb-4" currentStep={step} />
        <Button
          className="font-vk w-full"
          variant="primary"
          onClick={handleNext}
        >
          {step < 2 ? 'Далее' : 'Вперед'}
        </Button>
      </div>
    </Screen>
  )
}
