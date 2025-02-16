import type { FC, PropsWithChildren } from 'react'

interface StatisticContainerProps extends PropsWithChildren {
  title: string
  value: string
}

export const StatisticContainer: FC<StatisticContainerProps> = ({
  title,
  value,
  children,
}) => {
  return (
    <div className="relative flex justify-center">
      <div className="flex flex-col items-center gap-0.5">
        <p className="text-xs text-[#818C99]">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="absolute">{children}</div>
    </div>
  )
}
