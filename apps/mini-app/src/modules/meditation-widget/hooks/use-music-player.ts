import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

import { rotateArray } from '@/shared'

import type { Song } from '../types'

import { songs as localSongs } from '../consts'
import { useMeditationContext } from '../meditation-widget-context'

export function useMusicPlayer() {
  const [currentPlaying, setCurrentPlaying] = React.useState<Song>(
    localSongs[0],
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
    stop,
    isReady,
    isLoading,
    paused,
    duration,
  } = useGlobalAudioPlayer()

  const location = useLocation()

  const handleProgress = () => {
    setCurrentProgress(getPosition())
  }

  // Function to explicitly switch to a specific song
  const switchToSong = (song: Song) => {
    setCurrentPlaying(song)
    setCurrentProgress(0)
    // Load will automatically play the song if isTimerRunning is true
  }

  React.useEffect(() => {
    if (location.pathname !== '/meditation') {
      stop()
    }
  }, [location.state])

  React.useEffect(() => {
    isTimerRunning ? play() : pause()
  }, [isTimerRunning, isLoading])

  React.useEffect(() => {
    load(currentPlaying.path, {
      onload: () => {
        if (currentProgress > 0) {
          seek(currentProgress)
        }
        if (isTimerRunning) {
          play()
        }
      },
      onend: () => {
        // When song ends, automatically move to the next one
        const newQueue = rotateArray([...queue])
        setQueue(newQueue)
        setCurrentPlaying(newQueue[0])
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
    switchToSong,
  }
}
