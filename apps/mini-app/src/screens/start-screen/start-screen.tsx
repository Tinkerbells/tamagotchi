import { Screen } from '../screen'
import { StepDots, StepOne, StepThree, StepTwo } from './steps/steps'
import { useProvider } from '@/app/app-provider'
import { Button } from '@tamagotchi/ui'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export const StartScreen = () => {
  const [step, setStep] = React.useState(0)
  let navigate = useNavigate()
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
        setStep((prev) => prev + 1)
    }
  }, [setStep, step, navigator])
  return (
    <Screen>
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
    </Screen>
  )
}
