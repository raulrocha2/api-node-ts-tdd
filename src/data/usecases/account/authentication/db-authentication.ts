import {
  IAuthentication,
  IAuthenticationModel,
  IHashComparer,
  IEncrypter,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAutthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) { }

  async auth ({ email, password }: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isValidPassword = await this.hashComparer.compare(
        password,
        account.password
      )
      if (isValidPassword) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
