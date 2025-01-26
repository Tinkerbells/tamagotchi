import { StatisticContainer } from './statistic-container'
import { FetchedStatistics } from '@/data'
import { Heart, Meditation, Walking } from '@/shared'
import { FC } from 'react'

type ProfileStatisticsProps = FetchedStatistics

export const ProfileStatistics: FC<ProfileStatisticsProps> = ({
  meditation,
  gratitude,
  walking,
}) => {
  return (
    <div className="absolute bottom-[220px] flex justify-between gap-4">
      <StatisticContainer title="Благодарностей" value={gratitude.toString()}>
        <Heart className="h-[61px] w-[67px] text-[#dfc7ab] opacity-25" />
      </StatisticContainer>
      <StatisticContainer title="Медитировали" value={`${meditation}`}>
        <Meditation className="-mt-1 h-[80px] w-[92px] text-[#dfb8ab] opacity-25" />
      </StatisticContainer>
      <StatisticContainer title="Пройдено вместе" value={`${walking}км`}>
        <Walking className="-mt-4 h-[93px] w-[67px] text-[#d6b699] opacity-25" />
      </StatisticContainer>
    </div>
  )
}
