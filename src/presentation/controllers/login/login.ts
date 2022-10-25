import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoginController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    for (const field of ['email', 'password']) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
