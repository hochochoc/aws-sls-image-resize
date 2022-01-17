import type { AWS } from '@serverless/typescript'
import { imageResize } from '@functions/index'

export const serverlessConfiguration: AWS = {
  service: 'aws-sls-image-resize',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node12',
      define: { 'require.resolve': undefined },
      platform: 'node'
    },
    resizedImageBucketName: 'aws-sls-resized-images',
    resizedImageWidth: 320,
    resizedImageHeight: 200
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      binaryMediaTypes: ['*/*']
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: '*'
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      RESIZED_IMAGE_BUCKET_NAME: '${self:custom.resizedImageBucketName}'
    },
    lambdaHashingVersion: '20201221'
  },
  // import the function via paths
  functions: { imageResize },
  resources: {
    Resources: {
      ResizedImageBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${self:custom.resizedImageBucketName}',
          AccessControl: 'PublicRead'
        }
      }
    }
  }
}

module.exports = serverlessConfiguration
