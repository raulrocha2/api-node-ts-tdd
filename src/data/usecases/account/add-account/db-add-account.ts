import {
  IAccountModel,
  IAddAccount,
  IAddAccountParams,
  IHasher,
  IAddAccountRepository,
  ILoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) { }

  async add (accountData: IAddAccountParams): Promise<IAccountModel> {
    const accountExist = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!accountExist) {
      const passwordHashed = await this.hasher.hash(accountData.password)
      const account = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: passwordHashed })
      )
      return account
    }
    return null
  }
}
