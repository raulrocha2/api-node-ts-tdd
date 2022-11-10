import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/i-authentication'
import { IHashComparer } from '../../protocols/criptography/i-hash-comparer'
import { ITokenGenerator } from '../../protocols/criptography/i-token-generator'
import { ILoadAccountByEmailRepository } from '../../protocols/db/i-load-account-by-email-repository'

export class DbAutthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: ITokenGenerator
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
        return accessToken
      }
    }
    return null
  }
}
