import { ProfileHead } from './head'
import { PetRenameDialog } from '@/modules/modals'
import { Clip } from '@/shared'
import { Dialog, DialogTrigger } from '@tamagotchi/ui'
import * as React from 'react'

interface ProfileCardProps {
  name: string
  createdDate: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  createdDate,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative">
          <Clip className="absolute -right-[3.375rem] -top-10 z-10" />
          <div className="shadow-profile-card relative flex h-[296px] w-[265px] rotate-[6deg] flex-col items-center justify-center gap-1 rounded-[25px] bg-white">
            <svg
              width="34"
              height="33"
              viewBox="0 0 34 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 top-4 z-10"
            >
              <circle cx="17.3977" cy="16.5" r="16.5" fill="#F4F1EF" />
            </svg>
            <ProfileHead />
            <p className="text-text-secondary text-[15px]">Имя</p>
            <p className="text-xl font-bold">{name}</p>
            <p className="text-text-highlight text-xs">Изменить имя</p>
            <p className="text-text-secondary text-[15px]">Дней вместе</p>
            <p className="text-xl font-bold">{getDaysCount(createdDate)}</p>
          </div>
        </div>
      </DialogTrigger>
      <PetRenameDialog />
    </Dialog>
  )
}

const getDaysCount = (createdDate: string): number => {
  const created = new Date(createdDate)
  const today = new Date()

  if (isNaN(created.getTime())) {
    throw new Error('Invalid date format')
  }

  const diffInMs = today.getTime() - created.getTime()

  return Math.floor(diffInMs / (1000 * 60 * 60 * 24))
}
