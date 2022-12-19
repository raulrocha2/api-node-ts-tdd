import { IAccountModel } from '../models/i-account'

export interface IAddAccountModel {
  name: string
  email: string
  password: string
  role?: string
}

export interface IAddAccount {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
