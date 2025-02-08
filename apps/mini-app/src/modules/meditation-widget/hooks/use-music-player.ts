import { songs as localSongs } from '../consts'
import { useMeditationContext } from '../meditation-widget-context'
import { Song } from '../types'
import { rotateArray } from '@/shared'
import * as React from 'react'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

export const useMusicPlayer = () => {
  const [currentPlaying, setCurrentPlaying] = React.useState<Song>(
    localSongs[0]
  )

  const { isTimerRunning } = useMeditationContext()

  const [queue, setQueue] = React.useState<Song[]>(rotateArray(localSongs))
  const [currentProgress, setCurrentProgress] = React.useState(0)
  const {
    load,
    togglePlayPause,
    getPosition,
    play,
    pause,
    seek,
    isReady,
    isLoading,
    paused,
    duration,
  } = useGlobalAudioPlayer()

  const handleProgress = () => {
    setCurrentProgress(getPosition())
  }

  React.useEffect(() => {
    isTimerRunning ? play() : pause()
  }, [isTimerRunning])

  React.useEffect(() => {
    load(currentPlaying.path, {
      onload: () => {
        if (currentProgress > 0) {
          seek(currentProgress)
        }
      },
      onend: () => {
        setCurrentPlaying(queue[0])
        setQueue(rotateArray(queue))
      },
    })
  }, [load, currentPlaying, queue])

  return {
    handleProgress,
    currentPlaying,
    queue,
    setQueue,
    seek,
    togglePlayPause,
    isReady,
    paused,
    isLoading,
    duration,
  }
}
