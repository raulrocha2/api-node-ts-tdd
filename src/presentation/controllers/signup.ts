
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { IController, IEmailValidator } from '../protocols'
import { IHttpRequest, IHttpResponse } from '../protocols/i-http'

export class SignUpController implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator
  ) { }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError(httpRequest.body.email))
      }
    } catch (error) {
      return serverError()
    }
  }
}
