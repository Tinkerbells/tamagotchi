import { StepCard } from './step-card'
import { cn } from '@tamagotchi/utils'
import { Button } from '@vkontakte/vkui'
import { Typography } from '@vkontakte/vkui/dist/components/Typography/Typography'
import { easeInOut, motion } from 'framer-motion'
import * as React from 'react'

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  onNext: () => void
  currentStep: number
}

type StepWrapperProps = React.PropsWithChildren
type StepsDotsProps = Pick<StepProps, 'currentStep'>

const StepsDots: React.FC<StepsDotsProps> = ({ currentStep }) => {
  return (
    <div className="flex gap-2">
      {new Array(3).fill(null).map((_, index) => (
        <span className={cn('')} />
      ))}
    </div>
  )
}

const StepWrapper: React.FC<StepWrapperProps> = ({ children }) => {
  return (
    <motion.div
      className="flex flex-col"
      initial={{
        x: -1000,
      }}
      exit={{
        x: 1000,
        opacity: 0,
        transition: { duration: 1.5, ease: easeInOut },
      }}
      animate={{ x: 0 }}
    >
      {children}
    </motion.div>
  )
}

export const StepOne: React.FC<StepProps> = ({ onNext }) => {
  return (
    <StepWrapper>
      <StepCard />
      <Typography weight="1">Добро пожаловать!</Typography>
      <Typography weight="3">
        В этом приложении вам необходимо ухаживать за ментальным состоянием
        вашего питомца.
      </Typography>
      <Button onClick={onNext}>Далее</Button>
    </StepWrapper>
  )
}

export const StepTwo: React.FC<StepProps> = ({ onNext }) => {
  return (
    <StepWrapper>
      <Typography weight="1">Заботьтесь о себе и питомце</Typography>
      <Typography weight="3">
        Медитируйте, гуляйте, высыпайтесь и заботьтесь о питании вместе с
        питомцем.
      </Typography>
      <Button onClick={onNext}>Далее</Button>
    </StepWrapper>
  )
}

export const StepThree: React.FC<StepProps> = ({ onNext }) => {
  return (
    <StepWrapper>
      <Typography weight="1">
        Тогда ваш питомец и вы будете счастливы!
      </Typography>
      <Button onClick={onNext}>Далее</Button>
    </StepWrapper>
  )
}
