import { IAccountModel, IAddAccount, IAddAccountModel, IEncrypter } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly encrypter: IEncrypter
  ) { }

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(accountData.password)
    return await new Promise(resolve => resolve(null))
  }
}
