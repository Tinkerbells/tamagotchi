import './skeleton.css'
import { cn } from '@tamagotchi/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('skeleton rounded-2xl', className)} {...props} />
}

export { Skeleton }
