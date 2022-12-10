import { IHttpRequest, IHttpResponse } from './i-http'

export interface IMiddleware {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
