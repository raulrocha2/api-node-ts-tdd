import { IAddAccountModel } from '../../domain/usecases/i-add-account'
import { IAccountModel } from '../../domain/models/i-account'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
