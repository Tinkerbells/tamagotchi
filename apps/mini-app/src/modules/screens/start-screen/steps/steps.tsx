import images from './images'
import { StepCard } from './step-card'
import { StepTwoSvg } from './step-two-svg'
import { Image } from '@/shared/ui'
import { cn } from '@tamagotchi/utils'
import * as React from 'react'

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number
}

type StepDotsProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<StepProps, 'currentStep'>

export const StepDots: React.FC<StepDotsProps> = ({
  className,
  currentStep,
  ...props
}) => {
  const id = React.useId()
  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {new Array(3).fill(null).map((_, index) => (
        <span
          key={id + index}
          className={cn(
            'h-1 w-6 rounded-full',
            index === currentStep
              ? 'bg-[#252322]'
              : 'bg-[hsla(213,11%,55%,0.24)]'
          )}
        />
      ))}
    </div>
  )
}

export const StepOne: React.FC<StepProps> = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <StepCard>
        <div className="absolute mr-[3rem] w-[18rem] overflow-hidden rounded-b-[1.5rem]">
          <div className="relative mr-5 h-80 pt-24">
            <Image
              width={332}
              height={332}
              src={images.fgOne}
              className="obect-contain ml-[2rem] object-top"
            />
          </div>
        </div>
      </StepCard>
      <div className="font-vk flex flex-col gap-4 text-center">
        <h2>Добро пожаловать!</h2>
        <p className="text-gray text-lg">
          В этом приложении вам необходимо ухаживать за ментальным состоянием
          вашего питомца.
        </p>
      </div>
    </div>
  )
}

export const StepTwo: React.FC<StepProps> = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <StepCard>
        <StepTwoSvg />
        <picture className="absolute h-60 w-[18rem] overflow-hidden rounded-br-[1.5rem]">
          <Image
            placeholder="blur"
            width={238}
            height={238}
            className="mt-[3rem] h-[238px] w-[238px] object-contain object-right"
            src={images.fgTwo}
          />
        </picture>
      </StepCard>
      <div className="font-vk flex flex-col gap-4 text-center">
        <h2>Заботьтесь о себе и питомце</h2>
        <p className="text-gray text-lg">
          Медитируйте, гуляйте, высыпайтесь и заботьтесь о питании вместе с
          питомцем.
        </p>
      </div>
    </div>
  )
}

export const StepThree: React.FC<StepProps> = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <StepCard>
        <picture className="absolute top-0 flex h-80 w-60 items-center justify-center">
          <Image
            height={82}
            width={82}
            className="mb-24 h-[82px] w-[82px] object-contain"
            src={images.fgHeart}
          />
        </picture>
        <picture className="absolute h-80 w-60 overflow-hidden rounded-[1.5rem]">
          <Image
            height={476}
            width={387}
            className="mt-[6.75rem] h-[476px] w-[387px] object-cover"
            src={images.fgThree}
            style={{
              objectPosition: '30%',
            }}
          />
        </picture>
      </StepCard>
      <div className="flex flex-col gap-4 text-center">
        <h2>Тогда ваш питомец и вы будете счастливы!</h2>
      </div>
    </div>
  )
}
