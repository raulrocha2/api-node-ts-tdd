
import { IAddAccount } from '../../../domain/usecases/i-add-account'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { IController, IEmailValidator } from './signup-protocols'
import { IHttpRequest, IHttpResponse } from '../../protocols/i-http'

export class SignUpController implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: IAddAccount
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      for (const field of ['name', 'email', 'password', 'passwordConfimation']) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfimation } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError(email))
      }
      if (password !== passwordConfimation) {
        return badRequest(new InvalidParamError('passwordConfimation'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
