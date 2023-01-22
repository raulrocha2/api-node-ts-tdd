import { IAuthentication, IAuthenticationParams } from '../controllers/login/signup/signup-controller-protocols'

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: IAuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}
