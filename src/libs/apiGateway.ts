import { APIGatewayProxyResult } from 'aws-lambda'

export const formatJSONResponse = (statusCode: number, response: Record<string, unknown>): APIGatewayProxyResult => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    body: JSON.stringify(response)
  }
}
