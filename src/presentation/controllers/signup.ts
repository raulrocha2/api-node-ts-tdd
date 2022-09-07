import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { IController } from '../protocols/i-controller'
import { IHttpRequest, IHttpResponse } from '../protocols/i-http'

export class SignUpController implements IController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
