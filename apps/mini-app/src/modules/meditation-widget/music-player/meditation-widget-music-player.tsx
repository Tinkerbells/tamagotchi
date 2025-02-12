import { useMusicPlayer } from '../hooks'
import { MeditationWidgetMusicItem } from './meditation-widget-music-item'
import { MeditationWidgetMusicItemSkeleton } from './meditation-widget-music-item-skeleton'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useClickAway, useToggle } from '@uidotdev/usehooks'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import {
  PauseCircle,
  PlayCircle,
  CircleChevronDown,
  CircleChevronUp,
} from 'lucide-react'

const headerVariants = {
  closed: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  open: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}

export const MeditationWidgetPlayer = () => {
  const [open, toggleOpen] = useToggle(false)
  const ref = useClickAway<HTMLDivElement>(() => {
    toggleOpen(false)
  })
  const {
    togglePlayPause,
    paused,
    queue,
    setQueue,
    currentPlaying,
    isLoading: isMusicLoading,
    isReady,
    handleProgress,
  } = useMusicPlayer()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    handleProgress()
    if (active.id !== over.id) {
      setQueue((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const isLoading = isMusicLoading && isReady

  return (
    <div
      className="absolute top-20 z-10 flex w-full flex-col items-center"
      ref={ref}
    >
      <motion.div
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={headerVariants}
        transition={{ duration: 0.2, ease: easeInOut }}
        className="flex h-14 w-[90vw] items-center bg-white px-4 py-3"
      >
        {isLoading ? (
          <MeditationWidgetMusicItemSkeleton />
        ) : (
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tighter text-black">
              {currentPlaying?.title}
            </span>
            <span className="text-text-secondary text-xs font-medium tracking-tighter">
              {currentPlaying?.artist}
            </span>
          </div>
        )}
        <div className="ml-auto flex items-center">
          <button
            className="text-text-secondary flex aspect-square cursor-pointer items-center justify-center rounded-full p-2"
            onClick={togglePlayPause}
          >
            {paused ? <PlayCircle size={25} /> : <PauseCircle size={25} />}
          </button>
          <button
            className="text-text-secondary flex aspect-square cursor-pointer items-center justify-center rounded-full p-2"
            onClick={() => toggleOpen()}
          >
            {open ? (
              <CircleChevronUp size={25} />
            ) : (
              <CircleChevronDown size={25} />
            )}
          </button>
        </div>
      </motion.div>

      {/* Queue panel animated on open/close */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="queue-panel"
            initial={{ opacity: 0, height: 0, y: -15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: easeInOut }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={queue}
                strategy={verticalListSortingStrategy}
              >
                <ul className="w-[90vw] rounded-b-3xl bg-white">
                  <span className="text-text-secondary ml-4 text-[13px] leading-[154%] tracking-tighter">
                    Далее в очереди:
                  </span>
                  {queue.map((song, index) => (
                    <MeditationWidgetMusicItem
                      key={song.id}
                      id={song.id}
                      isLast={index === queue.length - 1}
                      song={song}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
