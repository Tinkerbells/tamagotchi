import { Song } from '../types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Separator } from '@tamagotchi/ui'
import { cn } from '@tamagotchi/utils'
import { Menu } from 'lucide-react'
import * as React from 'react'

interface SortableItemProps {
  id: string
  song: Song
  isLast?: boolean
}

export const MeditationWidgetMusicItem: React.FC<SortableItemProps> = ({
  id,
  song,
  isLast,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        className={cn(
          'flex touch-none items-center justify-between rounded-3xl bg-white px-4 py-3',
          isLast && 'pb-5'
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="whitespace-nowrap text-sm font-medium tracking-tighter text-black">
              {song.title}
            </span>
            <span className="text-text-secondary text-xs font-medium tracking-tighter">
              {song.artist}
            </span>
          </div>
          <Separator orientation="vertical" className="h-4 bg-[#eaeaea]" />
          <span className="text-text-secondary ml-2 text-sm tracking-tighter">
            {song.duration}
          </span>
        </div>
        <div className="flex items-center">
          <button
            className="rounded-full p-1 hover:bg-gray-200 focus:outline-none"
            {...attributes}
            {...listeners}
          >
            <Menu className="text-[#e0dee8]" size={24} />
          </button>
        </div>
      </li>
      {!isLast && (
        <Separator
          orientation="horizontal"
          className="mx-auto my-1 min-h-[1px] w-[90%] bg-[#eaeaea] px-4"
        />
      )}
    </>
  )
}
