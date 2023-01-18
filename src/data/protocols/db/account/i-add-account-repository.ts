import { IAccountModel } from '@/domain/models/i-account'
import { IAddAccountModel } from '@/domain/usecases/account/i-add-account'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
