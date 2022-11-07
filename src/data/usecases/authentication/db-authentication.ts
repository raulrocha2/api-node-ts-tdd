import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/i-authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/db/i-load-account-by-email-repository'

export class DbAutthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) { }

  async auth ({ email, password }: IAuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(email)
    return null
  }
}
