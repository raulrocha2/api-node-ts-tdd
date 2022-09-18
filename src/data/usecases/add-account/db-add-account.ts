import { IAccountModel } from '../../../domain/models/i-account'
import { IAddAccount, IAddAccountModel } from '../../../domain/usecases/i-add-account'
import { IEncrypter } from './protocols/encrypter'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly encrypter: IEncrypter
  ) { }

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(accountData.password)
    return await new Promise(resolve => resolve(null))
  }
}
