
import { IAddAccount } from '../../../../domain/usecases/i-add-account'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { IController, IValidation, IAuthentication } from './signup-controller-protocols'
import { IHttpRequest, IHttpResponse } from '../../../protocols/i-http'
import { EmailExistsError } from '../../../errors'

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
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailExistsError())
      }
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
