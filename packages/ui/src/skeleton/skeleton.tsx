import './skeleton.css'
import { cn } from '@tamagotchi/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('skeleton rounded-md', className)} {...props} />
}

export { Skeleton }
