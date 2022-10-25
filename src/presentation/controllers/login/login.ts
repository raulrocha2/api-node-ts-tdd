import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoginController implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    for (const field of ['email', 'password']) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const validEmail = this.emailValidator.isValid(httpRequest.body.email)
    if (!validEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
