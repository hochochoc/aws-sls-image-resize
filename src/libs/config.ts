interface Config {
  RESIZED_IMAGE_HEIGHT: number
  RESIZED_IMAGE_WIDTH: number
  RESIZED_IMAGE_BUCKET_NAME: string
}

// Loading process.env as ENV interface

export const getConfig = (): Config => {
  return {
    RESIZED_IMAGE_HEIGHT: process.env.RESIZED_IMAGE_HEIGHT ? Number(process.env.RESIZED_IMAGE_HEIGHT) : 200,
    RESIZED_IMAGE_WIDTH: process.env.RESIZED_IMAGE_WIDTH ? Number(process.env.RESIZED_IMAGE_WIDTH) : 320,
    RESIZED_IMAGE_BUCKET_NAME: process.env.RESIZED_IMAGE_BUCKET_NAME || 'aws-sls-resized-images'
  }
}
