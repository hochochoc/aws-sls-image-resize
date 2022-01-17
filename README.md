## Problem
The API receives an image, resizes it to 320x200px, stores it in S3 and returns a URL for retrieving the smaller image. 

In summary:
- Lambda
- Typescript
- Serverless
- Resize image to 320 x 200
- Upload to S3 and return URL

## Prerequisites
- nodejs 16.3.0 (use asdf to manage)

## Installation
```
$ npm install
```
## Deployment
```
# setup credentials
$ serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY
# test locally
$ serverless offline
# deploy on stage development
$ serverless deploy
```
## Resize image
```
$ curl -X POST \
  https://83vilinyc6.execute-api.us-east-1.amazonaws.com/dev/imageResize \
  -F 'image=@download.jpeg'
```
| Element             | Description | Type   | Required | Notes                                                        |
| ------------------- | ----------- | ------ | -------- | ------------------------------------------------------------ |
| image                | body        | image  | required | allowed image formats: jpeg, jpg, png, bmp, gif, tif, tiff. Max size is 4mb |
