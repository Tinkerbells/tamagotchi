import { getPetImage, getPetAccessory } from './lib'
import { MoodType, PetAccessoryType } from '@/data'
import { Image } from '@/shared'
import { AccessoryType } from '@tamagotchi/api/hc'
import * as React from 'react'

interface PetImageProps {
  accessory?: PetAccessoryType
  petMood?: MoodType
}

export const PetImage: React.FC<PetImageProps> = ({ petMood, accessory }) => {
  return (
    <div className="relative flex h-[354px] w-[266px] items-center justify-center">
      <figure className="absolute bottom-3.5 max-h-[267px] max-w-[217px]">
        <Image src={getPetImage(petMood)} width={217} height={267} />
      </figure>
      {accessory && (
        <figure className="absolute left-3 h-full w-full">
          <Image
            src={getPetAccessory(accessory.type as AccessoryType)}
            width={266}
            height={354}
          />
        </figure>
      )}
    </div>
  )
}
