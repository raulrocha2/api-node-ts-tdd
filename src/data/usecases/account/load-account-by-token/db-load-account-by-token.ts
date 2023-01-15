import { ILoadAccountByToken, IAccountModel, IDecrypter, ILoadAccountByTokenRepository } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
    private readonly dercypter: IDecrypter
  ) { }

  async load (accessToken: string, role?: string | undefined): Promise<IAccountModel> {
    const token = await this.dercypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
