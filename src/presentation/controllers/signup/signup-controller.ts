
import { IAddAccount } from '../../../domain/usecases/i-add-account'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { IController, IValidation, IAuthentication } from './signup-controller-protocols'
import { IHttpRequest, IHttpResponse } from '../../protocols/i-http'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      await this.addAccount.add({
        name,
        email,
        password
      })
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
