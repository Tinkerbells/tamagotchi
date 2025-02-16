import { useEffect, useRef } from 'react'

export function useAutoScroll<T extends HTMLElement>(dependencies: any[] = []): React.RefObject<T> {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollLeft = container.scrollWidth
    }
  }, dependencies) // Re-run effect when dependencies change

  return containerRef
}
