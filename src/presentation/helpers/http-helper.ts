import { IHttpResponse } from '../protocols/i-http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})
