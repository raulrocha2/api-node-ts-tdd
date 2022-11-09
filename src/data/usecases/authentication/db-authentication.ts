import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/i-authentication'
import { IHashComparer } from '../../protocols/criptography/i-hash-comparer'
import { ILoadAccountByEmailRepository } from '../../protocols/db/i-load-account-by-email-repository'

export class DbAutthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer
  ) { }

  async auth ({ email, password }: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (account) {
      await this.hashComparer.compare(password, account.password)
    }
    return null
  }
}
