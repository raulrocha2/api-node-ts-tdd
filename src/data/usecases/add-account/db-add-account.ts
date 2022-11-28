import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
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

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const passwordHashed = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: passwordHashed })
    )
    return account
  }
}
