import { Achievement } from '@/data'
import { CheckCircle } from '@/shared'
import { cn } from '@tamagotchi/utils'
import * as React from 'react'

interface AchievementsItemProps {
  achievement: Achievement
}
export const AchievementsItem: React.FC<AchievementsItemProps> = ({
  achievement,
}) => {
  return (
    <div
      className={cn(
        'border-custom-border shadow-achievement flex items-center rounded-lg border-[0.5px] bg-white py-3 pl-3 pr-2 opacity-100',
        !achievement.isUnlocked && 'opacity-40'
      )}
    >
      <span className="mr-1.5">{achievement.icon}</span>
      <div>
        <p className="text-sm font-bold">{achievement.title}</p>
        <p className="text-text-secondary text-xs">{achievement.description}</p>
      </div>
      <CheckCircle className="ml-auto h-4 w-4 place-self-start text-[#d49571]" />
    </div>
  )
}
