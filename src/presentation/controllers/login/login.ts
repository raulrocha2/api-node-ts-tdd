import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'

export class LoginController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return badRequest(new MissingParamError('email'))
  }
}
