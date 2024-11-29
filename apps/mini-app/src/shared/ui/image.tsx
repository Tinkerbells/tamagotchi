'use client'

import { buildThumbnail } from './lib/build-image'
import { Skeleton } from '@tamagotchi/ui'
import { cn } from '@tamagotchi/utils'
import * as React from 'react'

type ImagePlaceholderType = 'blur' | 'skeleton'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  width: number
  height: number
  placeholder?: ImagePlaceholderType
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, width, height, placeholder, ...props }, ref) => {
    const [aspectRatio, setAspectRatio] = React.useState<string | number>(
      width / height
    )
    const [isLoading, setIsLoading] = React.useState(true)

    const thumbnail = buildThumbnail(src)

    React.useEffect(() => {
      const image = new window.Image()
      image.src = src
      image.onload = () => setIsLoading(false)

      if (image.complete) {
        setIsLoading(false)
      }
    }, [src])

    React.useEffect(() => {
      setAspectRatio(`${width}/${height}`)
    }, [height, width])

    return (
      <picture
        className={cn('overflow-hidden', className)}
        style={{ aspectRatio: `${aspectRatio}`, width: width, height: height }}
      >
        <source type="image/webp" />
        {isLoading ? (
          placeholder === 'blur' ? (
            <img
              className={cn(
                'h-full w-full animate-pulse object-cover blur-sm',
                className
              )}
              src={thumbnail}
              ref={ref}
            />
          ) : (
            placeholder === 'skeleton' && (
              <Skeleton className={cn('h-full w-full', className)} />
            )
          )
        ) : (
          <img
            className={cn('h-full w-full object-cover', className)}
            loading="lazy"
            src={src}
            ref={ref}
            {...props}
          />
        )}
      </picture>
    )
  }
)
