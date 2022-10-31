
import { IAddAccount } from '../../../domain/usecases/i-add-account'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { IController, IValidation } from './signup-protocols'
import { IHttpRequest, IHttpResponse } from '../../protocols/i-http'

export class SignUpController implements IController {
  constructor (

    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation
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

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
