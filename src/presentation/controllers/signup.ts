import { MissingParamError } from '../errors/missing-param-error'
import { IHttpRequest, IHttpResponse } from '../protocols/i-http'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    for (const field of ['name', 'email']) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
      }
    }
  }
}
