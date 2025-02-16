import * as React from 'react'

import type { UserId } from '@/data'

import { useGetShop } from '@/data'

import { Accessories, AccessoriesSkeleton } from './accessories'
import { InteriorItems, InteriorItemsSkeleton } from './interior'

interface ShopProps {
  userId: UserId
  onScrollChange?: (visible: boolean) => void // Callback for navbar visibility
}

export const ShopWidget: React.FC<ShopProps> = ({ userId, onScrollChange }) => {
  const { data: shop, isLoading } = useGetShop({ userId: userId.toString() })
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const container = containerRef.current
    if (!container || !onScrollChange)
      return

    const handleScroll = () => {
      if (!container)
        return
      onScrollChange(container.scrollTop <= 0)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [onScrollChange])

  return (
    <div
      ref={containerRef}
      className="scrollbar-hide h-[calc(100vh-64px)] overflow-y-scroll pt-28"
    >
      {!shop || isLoading
        ? (
            <>
              <AccessoriesSkeleton />
              <InteriorItemsSkeleton />
            </>
          )
        : (
            <div className="flex flex-col gap-8">
              <Accessories data={shop.accessories} />
              <InteriorItems data={shop.interior_items} />
            </div>
          )}
    </div>
  )
}
