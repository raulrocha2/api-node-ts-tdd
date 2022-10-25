import { IAuthentication } from '../../../domain/usecases/i-authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoginController implements IController {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly emailValidator: IEmailValidator
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      for (const field of ['email', 'password']) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const validEmail = this.emailValidator.isValid(email)
      if (!validEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
