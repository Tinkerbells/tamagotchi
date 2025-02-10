import * as React from "react"
import { useGratitudesWidgetContext } from "../gratitude-widget-context"
import { useRemoveGratitude } from "@/data"

const OFFSET = 100 // 100px offset

export const useGratitudesWidgetMessages = () => {
  const { current } = useGratitudesWidgetContext()

  const { mutate: removeItemMutatation, isPending: isItemRemoving } = useRemoveGratitude()
  const id = React.useId()

  // Use a Set to track the IDs of items being removed
  const [removingItems, setRemovingItems] = React.useState<Set<string>>(new Set())

  const removeItem = React.useCallback((id: number) => {
    // Add the item to the "removing" set
    setRemovingItems((prev) => new Set(prev.add(id.toString())))
    removeItemMutatation({ id: id.toString() })
  }, [removeItemMutatation])

  // Reference to the container to control scrolling
  const containerRef = React.useRef<HTMLDivElement>(null)

  // State to track visible messages
  const [visibleMessages, setVisibleMessages] = React.useState<Set<string>>(new Set())

  // Scroll to the latest message whenever a new message is added
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [current]) // Dependency updated to current to handle new message updates

  // Set up Intersection Observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const messageId = entry.target.getAttribute("data-message-id")
          if (messageId) {
            setVisibleMessages((prev) => {
              const newSet = new Set(prev)
              if (entry.isIntersecting) {
                newSet.add(messageId)
              } else {
                // Check if the item is fully outside the container (including offset)
                const containerRect = containerRef.current?.getBoundingClientRect()
                const itemRect = entry.target.getBoundingClientRect()
                if (containerRect) {
                  if (itemRect.bottom < containerRect.top + OFFSET || itemRect.top > containerRect.bottom - OFFSET) {
                    newSet.delete(messageId)
                  } else {
                    newSet.add(messageId)
                  }
                }
              }
              return newSet
            })
          }
        })
      },
      {
        root: containerRef.current,
        rootMargin: `-${OFFSET}px 0px -${OFFSET}px 0px`,
        threshold: 0,
      },
    )

    // Observe all message elements
    const messageElements = containerRef.current?.querySelectorAll(".message-item")
    messageElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [current]) // Dependency updated to current for real-time message tracking

  return { containerRef, visibleMessages, id, current, removeItem, isItemRemoving, removingItems }
}
