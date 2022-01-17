import * as AWS from 'aws-sdk'
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as fileType from 'file-type'
import jimp from 'jimp'
import * as parser from 'lambda-multipart-parser'
import { v4 as uuid } from 'uuid'

import { formatJSONResponse } from '@libs/apiGateway'
import { getConfig } from '@libs/config'

const s3 = new AWS.S3()
const config = getConfig()

const imageResize = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const result = await parser.parse(event)

    const image = result.files.find(i => i.fieldname === 'image')
    if (image == null) {
      return formatJSONResponse(400, { message: 'Not found input image' })
    }

    const fileInfo = await fileType.fromBuffer(image.content)
    if (fileInfo == null) {
      return formatJSONResponse(400, { message: 'Cannot get info of image' })
    }

    const detectedExt = fileInfo.ext
    const detectedMime = fileInfo.mime
    if (detectedMime !== image.contentType) {
      return formatJSONResponse(400, { message: `Incorrect mime ${detectedMime} vs ${image.contentType}` })
    }

    const resizedImage = await jimp.read(image.content)
      .then(async imageContent => {
        imageContent.resize(config.RESIZED_IMAGE_WIDTH, config.RESIZED_IMAGE_HEIGHT)
        return await imageContent.getBufferAsync(detectedMime)
      })

    const name = uuid()
    const key = `${name}.${detectedExt}`
    await s3.putObject({
      Body: resizedImage,
      Key: key,
      ContentType: detectedMime,
      Bucket: `${config.RESIZED_IMAGE_BUCKET_NAME}`,
      ACL: 'public-read'
    }).promise()

    const url = `https://${config.RESIZED_IMAGE_BUCKET_NAME}.s3.amazonaws.com/${key}`
    return formatJSONResponse(200, {
      url: url
    })
  } catch (error) {
    return formatJSONResponse(500, {
      message: error.message
    })
  }
}

export const main = imageResize
