
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
      const { email, password, passwordConfimation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError(email))
      }
      if (password !== passwordConfimation) {
        return badRequest(new InvalidParamError('passwordConfimation'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
