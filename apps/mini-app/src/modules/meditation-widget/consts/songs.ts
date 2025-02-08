import { Song } from '../types'
import songPath1 from '@public/music/meditation-1.mp3'
import songPath2 from '@public/music/meditation-2.mp3'
import songPath3 from '@public/music/meditation-3.mp3'
import songPath4 from '@public/music/meditation-4.mp3'

export const songs: Song[] = [
  {
    id: 'song 1',
    path: songPath1,
    title: 'song 1',
    artist: 'meditation',
    duration: '04:33',
  },
  {
    id: 'song 2',
    path: songPath2,
    title: 'song 2',
    artist: 'meditation',
    duration: '01:21',
  },
  {
    id: 'song 3',
    path: songPath3,
    title: 'song 3',
    artist: 'meditation',
    duration: '01:49',
  },
  {
    id: 'song 4',
    path: songPath4,
    title: 'song 4',
    artist: 'meditation',
    duration: '03:29',
  },
]
