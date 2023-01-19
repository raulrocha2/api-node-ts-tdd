import { IAccountModel } from '@/domain/models/i-account'
import { IAddAccountParams } from '@/domain/usecases/account/i-add-account'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountParams) => Promise<IAccountModel>
}
