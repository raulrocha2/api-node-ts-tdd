import {
  IAuthentication,
  IAuthenticationModel,
  IHashComparer,
  ITokenGenerator,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAutthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) { }

  async auth ({ email, password }: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (account) {
      const isValidPassword = await this.hashComparer.compare(
        password,
        account.password
      )
      if (isValidPassword) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
