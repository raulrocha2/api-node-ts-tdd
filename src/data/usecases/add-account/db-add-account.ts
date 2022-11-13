import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IHasher,
  IAddAccountRepository
} from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository
  ) { }

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const passwordHashed = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: passwordHashed })
    )
    return account
  }
}
