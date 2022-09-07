import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { IHttpRequest, IHttpResponse } from '../protocols/i-http'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    for (const field of ['name', 'email']) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
