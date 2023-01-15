import { IAccountModel } from '../../models/i-account'

export type IAddAccountModel = Omit<IAccountModel, 'id'>

export interface IAddAccount {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
