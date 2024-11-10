export const buildThumbnail = (src: string) => {
  const thumbnail = src.replace('.webp', '-thumb.webp')
  return thumbnail
}
