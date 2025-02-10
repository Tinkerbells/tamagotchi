import { motion, AnimatePresence } from "framer-motion"
import { Loader2, X } from "lucide-react"
import { useGratitudesWidgetMessages } from "./hooks"

export const GratitudesWidgetMessages = () => {
  const { containerRef, visibleMessages, id, current, removeItem, isItemRemoving, removingItems } = useGratitudesWidgetMessages()

  return (
    <div
      ref={containerRef}
      className="h-full z-10 py-16 w-full flex flex-col-reverse items-center gap-4 overflow-y-scroll overflow-visible scrollbar-hide"
    >
      <AnimatePresence>
        {current.map((gratitude, index) => (
          <motion.div
            key={id + gratitude.id}
            data-message-id={gratitude.id}
            className={`message-item bg-white rounded-3xl shadow-gratitude-message py-3 px-4 w-fit text-text-secondary text-xs tracking-tighter 
              ${index % 2 === 0 ? "mr-[30vw]" : "ml-[30vw]"}`}
            initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
            animate={{
              opacity: visibleMessages.has(gratitude.id.toString()) ? 1 : 0,
              y: 0,
              rotate: index % 2 === 0 ? -5 : 5,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              y: -50,
              rotate: index % 2 === 0 ? -5 : 5,
              transition: { duration: 0.2 },
            }}
          >
            {gratitude.message}
            <button
              onClick={() => removeItem(gratitude.id)}
              className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#fef5e9] text-[#dfbc98] flex items-center justify-center">
              {removingItems.has(gratitude.id.toString()) && isItemRemoving ? (
                <Loader2 size={14} className="animate-spin fill-[#dfbc98]" />
              ) : (
                <X className="fill-[#dfbc98]" size={14} />
              )}
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
