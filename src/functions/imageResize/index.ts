import { handlerPath } from '@libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'imageResize',
        cors: true
      }
    }
  ],
  environment: {
    RESIZED_IMAGE_HEIGHT: '${self:custom.resizedImageHeight, 200}',
    RESIZED_IMAGE_WIDTH: '${self:custom.resizedImageWidth, 320}'
  }
}
