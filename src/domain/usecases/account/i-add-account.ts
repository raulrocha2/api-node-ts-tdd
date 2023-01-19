import { IAccountModel } from '../../models/i-account'

export type IAddAccountParams = Omit<IAccountModel, 'id'>

export interface IAddAccount {
  add: (accountData: IAddAccountParams) => Promise<IAccountModel>
}
