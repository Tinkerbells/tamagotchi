import { Gems, useAuth } from '@/shared'

export function GemsWidget() {
  const { user } = useAuth()
  return (
    <div className="absolute left-8 top-3">
      <Gems size="L" count={user.gems} />
    </div>
  )
}
