import { env } from './env'
import { Cloudinary } from '@cloudinary/url-gen/index'

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
  },
})
