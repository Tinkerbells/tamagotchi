import { StepOne, StepThree, StepTwo } from './steps/steps'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { AnimatePresence } from 'framer-motion'
import * as React from 'react'

export const StartScreen = () => {
  const [step, setStep] = React.useState(0)
  const navigator = useRouteNavigator()
  const steps = React.useMemo(
    () => [
      <StepOne currentStep={step} onNext={() => setStep((prev) => prev + 1)} />,
      <StepTwo currentStep={step} onNext={() => setStep((prev) => prev + 1)} />,
      <StepThree currentStep={step} onNext={() => navigator.push('/')} />,
    ],
    [navigator, step]
  )

  return (
    <div className="flex h-screen w-full justify-center overflow-hidden">
      <AnimatePresence initial={false}>{steps[step]}</AnimatePresence>
    </div>
  )
}
