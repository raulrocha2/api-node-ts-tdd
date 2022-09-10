import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { badRequest } from '../helpers/http-helper'
import { IController } from '../protocols/i-controller'
import { IEmailValidator } from '../protocols/i-email-validator'
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
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
